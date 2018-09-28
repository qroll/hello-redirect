"use strict";

var _bye = require("./bye");

var _bye2 = _interopRequireDefault(_bye);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hello = require("./folder/hello");


console.log("=======================================================================");
console.log("cwd:", process.cwd());
console.log("__dirname in ./:", __dirname);
console.log("=======================================================================");