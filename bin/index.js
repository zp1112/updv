#!/usr/bin/env node

import program from 'commander';
import queryFunc from '../lib/query';

const commandParser = (func) => {
  return (from, to, time) => {
    func(from, to, time, {
      highway: program.type,
      purposeCode: program.person
    });
  };
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

program
 .version('0.0.1')
 .option('-t, --type [type]', '只看高铁/动车/快车')
 .option('--person [person]', '成人票/学生票')
 .parse(process.argv);

program
   .command('query <from> <to> <time>')
   .action(commandParser(queryFunc))
   .parse(process.argv);

program.parse(process.argv);
