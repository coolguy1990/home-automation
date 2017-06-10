const rfs = require('rotating-file-stream');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'log');
// ensure log dir exits
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogFile = rfs('all-access.log', {
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
});

module.exports = accessLogFile;
