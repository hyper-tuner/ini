#!/usr/bin/env node

import { INI } from './ini';
import fs from 'fs';

enum Commands {
  VALIDATE = 'validate',
}

const loadFile = (filename: string) => {
  const b = fs.readFileSync(filename);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
};

const showUsage = () => {
  console.info('\nℹ Usage:');
  console.info('hypertuner-ini validate some_ini_file.ini');
  process.exit(1);
};

const validate = (filename: string) => {
  const ini = new INI(loadFile(filename));

  try {
    ini.parse();
  } catch (error) {
    console.info('❌ Errors found:');
    console.info((error as Error).message);
    process.exit(1);
  }

  console.info('✅ All good!');
};

const command = process.argv[2];
const filename = process.argv[3];

if (!command) {
  console.info('❗️ Please provide a command to run');
  showUsage();
  process.exit(1);
}

if (!filename) {
  console.info('❗️ Please provide a file name');
  showUsage();
  process.exit(1);
}

switch (command) {
  case Commands.VALIDATE:
    validate(filename);
    break;

  default:
    console.info(`❗️ Unknown command: ${command}, please use one of: [${Object.values(Commands).join(', ')}]`);
    process.exit(1);
    break;
}
