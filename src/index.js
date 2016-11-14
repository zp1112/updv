#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import queryFunc from './query';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const file = path.join(__dirname, '../package.json');
const pack = require(file);
program
 .version(pack.version)
 .option('-m, --m [command]', '提交信息')
 .parse(process.argv);

program
   .arguments('<type>')
   .action(queryFunc)
   .parse(process.argv);
