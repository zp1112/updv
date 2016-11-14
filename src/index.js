#!/usr/bin/env node
import program from 'commander';
import queryFunc from './query';
import pack from '../package.json';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log(__dirname);
program
 .version(pack.version)
 .option('-m, --m [command]', '提交信息')
 .parse(process.argv);

program
   .arguments('<type>')
   .action(queryFunc)
   .parse(process.argv);
