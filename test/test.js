
const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const yaml = require('js-yaml');
const crypto = require('crypto');
const { INI } = require('../dist');

const SPEEDUINO_VERSIONS = [
  '202207',
  '202202',
  '202201',
  '202108',
  '202103',
  '202012',
];

const pathFor = (ecosystem, file) => path.join(__dirname, `/../test/data/${ecosystem}/${file}`);

const hashReference = (ecosystem, version) => {
  const md5Yaml = crypto.createHash('md5');
  const md5Json = crypto.createHash('md5');

  md5Yaml.update(fs.readFileSync(pathFor(ecosystem, `yaml/${version}.yml`), 'utf8'));
  md5Json.update(fs.readFileSync(pathFor(ecosystem, `json/${version}.json`), 'utf8'));

  return {
    yamlOld: md5Yaml.digest('hex'),
    jsonOld: md5Json.digest('hex'),
  };
};

const runFor = (ecosystem, versions, generateOnly) => {
  versions.forEach((version) => {
    fs.readFile(pathFor(ecosystem, `ini/${version}.ini`), 'utf8', (_err, data) => {
      const result = new INI((new TextEncoder()).encode(data))
        .parse()
        .getResults();

      const yamlContent = yaml.dump(result);
      const jsonContent = JSON.stringify(result);

      const md5YamlNew = crypto.createHash('md5');
      const md5JsonNew = crypto.createHash('md5');

      const yamlNew = md5YamlNew.update(yamlContent).digest('hex');
      const jsonNew = md5JsonNew.update(jsonContent).digest('hex');

      // write temp files to disk so we can debug more easily
      fs.writeFileSync(pathFor(ecosystem, `tmp/${version}.yml`), yamlContent);
      fs.writeFileSync(pathFor(ecosystem, `tmp/${version}.json`), jsonContent);

      if (!generateOnly) {
        const { yamlOld, jsonOld } = hashReference(ecosystem, version);
        assert.equal(yamlNew, yamlOld, `Generated file ${version}.yaml looks different than expected`);
        assert.equal(jsonNew, jsonOld, `Generated file ${version}.json looks different than expected`);
      }

      // fs.unlinkSync(pathFor(ecosystem, `tmp/${version}.yml`));
      // fs.unlinkSync(pathFor(ecosystem, `tmp/${version}.json`));
    });
  });
};

const run = (generateOnly) => {
  runFor('speeduino', SPEEDUINO_VERSIONS, generateOnly);
};

run(process.argv[2] === 'generate');
