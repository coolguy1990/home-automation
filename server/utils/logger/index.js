/**
 * Created by kunal on 9/6/17.
 */
let log = require('js-logging');
let path = require('path');

let customLogFileOptions = {
  path: path.join(__dirname, '..', 'log'),
  filename: 'homeauto',
  filenameDateFormat: 'yyyy-mm-dd',
  pathFormat: '${path}/${filename}${filenameDateFormat}.log',
  lineEnding: '\r\n',
  format: "${timestamp} <${title}> ${file}:${line} ${method} ${message}",
  dateformat: "isoDateTime",
  level: 'debug',
  methods: ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency']
};

let Log = log.dailyFile(customLogFileOptions);

module.exports = Log;
