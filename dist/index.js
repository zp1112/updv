#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandParser = function commandParser(func) {
  return function (type) {
    func(type, {
      command: _commander2.default.m
    });
  };
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var file = _path2.default.join(__dirname, '../package.json');
var pack = require(file);

_commander2.default.version(pack.version).option('-m, --m [command]', '提交信息').parse(process.argv);

_commander2.default.command('<type>').action(commandParser(_query2.default)).parse(process.argv);

_commander2.default.parse(process.argv);