'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = _child_process2.default.exec;
var file = _path2.default.join(__dirname, '../package.json');

var query = function query(type, param) {
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
  var pkg = _package2.default;
  var version = pkg.version.split('.').map(Number).map(function (d, i) {
    if (i > idx) {
      return 0;
    }
    if (i < idx) {
      return d;
    }
    return d + 1;
  }).join('.');

  pkg.version = version;
  pkg.description = new Date().toLocaleString();

  pkg = (0, _stringify2.default)(pkg, null, 2);
  _fs2.default.writeFileSync(file, pkg);
  exec(['git add .', 'git commit -m \'v' + version + ' - ' + param.m + '\'', 'git push'].join('\n'), function (err, stdout, stderr) {
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