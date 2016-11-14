#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log(__dirname);
_commander2.default.version(_package2.default.version).option('-m, --m [command]', '提交信息').parse(process.argv);

_commander2.default.arguments('<type>').action(_query2.default).parse(process.argv);