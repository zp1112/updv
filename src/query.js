import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';
import shell from 'shelljs';

const pack = require(path.join(shell.pwd().stdout, '/package.json'));

const exec = childProcess.exec;

const query = (type, param) => {
  const file = path.join(shell.pwd().stdout, '/package.json');
  let idx;
  if (type === 'minor') {
    idx = 1;
  } else if (type === 'major') {
    idx = 0;
  } else if (type === 'patch') {
    idx = 2;
  } else {
    console.log('please enter version type in patch,major or minor');
    return;
  }
  let pkg = pack;
  const version = pkg.version.split('.').map(Number).map((d, i) => {
    if (i > idx) {
      return 0;
    }
    if (i < idx) {
      return d;
    }
    return d + 1;
  })
    .join('.');

  pkg.version = version;
  pkg.description = (new Date()).toLocaleString();

  pkg = JSON.stringify(pkg, null, 2);
  fs.writeFileSync(file, pkg);
  exec([
    'git add .',
    `git commit -m 'v${version} - ${param.m || 'normal push'}'`,
    'git push'
  ].join('\n'), (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
  });
};

module.exports = query;
