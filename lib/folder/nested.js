"use strict";

var _bye = require("../bye");

var _bye2 = _interopRequireDefault(_bye);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hello = require("./hello");


console.log("=======================================================================");
console.log("cwd:", process.cwd());
console.log("__dirname in ./folder/nested:", __dirname);
console.log("=======================================================================");