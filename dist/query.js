'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var file = path.join(__dirname, '../package.json');
var pack = require(file);

var query = function query(type, params) {
  var idx = void 0;
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
  var version = pack.version.split('.').map(Number).map(function (d, i) {
    if (i > idx) {
      return 0;
    }
    if (i < idx) {
      return d;
    }
    return d + 1;
  }).join('.');

  pack.version = version;
  pack.description = new Date().toLocaleString();

  pack = (0, _stringify2.default)(pack, null, 2);
  fs.writeFileSync(file, pack);
  exec(['cd ' + path.join(__dirname, '../'), 'git add .', 'git commit -m \'v' + version + ' - Static Files Generator\'', 'git push'].join('\n'), function (err, stdout, stderr) {
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