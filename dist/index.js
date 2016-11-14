#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
_commander2.default.option('-m, --m [command]', '提交信息').parse(process.argv);

_commander2.default.arguments('<type>').action(_query2.default).parse(process.argv);