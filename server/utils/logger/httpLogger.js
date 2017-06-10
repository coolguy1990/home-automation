/**
 * Created by kunal on 10/6/17.
 */
let rfs = require('rotating-file-stream');
let fs = require('fs');
let path = require('path');

const logDirectory = path.join(__dirname, '..', 'log');
// ensure log dir exits
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

let accessLogFile = rfs('all-access.log', {
  interval: '1d',
  path: logDirectory,
  compress: 'gzip'
});

module.exports = accessLogFile;
