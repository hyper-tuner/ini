
const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const yaml = require('js-yaml');
const crypto = require('crypto');
const { INI } = require('../dist');

const VERSIONS = [
  '202207',
  '202202',
  '202201',
  '202108',
  '202103',
  '202012',
];

const pathFor = (file) => path.join(__dirname, `/../test/data/${file}`);

const hashReference = (version) => {
  const md5Yaml = crypto.createHash('md5');
  const md5Json = crypto.createHash('md5');

  md5Yaml.update(fs.readFileSync(pathFor(`yaml/${version}.yml`), 'utf8'));
  md5Json.update(fs.readFileSync(pathFor(`json/${version}.json`), 'utf8'));

  return {
    yamlOld: md5Yaml.digest('hex'),
    jsonOld: md5Json.digest('hex'),
  };
};

const run = (generateOnly) => {
  VERSIONS.forEach((version) => {
    fs.readFile(pathFor(`ini/${version}.ini`), 'utf8', (_err, data) => {
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
      fs.writeFileSync(pathFor(`tmp/${version}.yml`), yamlContent);
      fs.writeFileSync(pathFor(`tmp/${version}.json`), jsonContent);

      if (!generateOnly) {
        const { yamlOld, jsonOld } = hashReference(version);
        assert.equal(yamlNew, yamlOld, `Generated file ${version}.yaml looks different than expected`);
        assert.equal(jsonNew, jsonOld, `Generated file ${version}.json looks different than expected`);
      }

      // fs.unlinkSync(pathFor(`tmp/${version}.yml`));
      // fs.unlinkSync(pathFor(`tmp/${version}.json`));
    });
  });
};

run(process.argv[2] === 'generate');
