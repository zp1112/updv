const path = require('path');
const fs = require('fs');

let pack = require(path.join(__dirname, '../package.json'));
const exec = require('child_process').exec;

const file = path.join(__dirname, '../package.json');

const query = (type) => {
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
  const version = pack.version.split('.').map(Number).map((d, i) => {
    if (i > idx) {
      return 0;
    }
    if (i < idx) {
      return d;
    }
    return d + 1;
  })
    .join('.');

  pack.version = version;
  pack.description = (new Date()).toLocaleString();

  pack = JSON.stringify(pack, null, 2);
  fs.writeFileSync(file, pack);
  exec([
    `cd ${path.join(__dirname, '../')}`,
    'git add .',
    `git commit -m 'v${version} - Static Files Generator'`,
    'git push'
  ].join('\n'), (err, stdout, stderr) => {
    console.log(1);
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
