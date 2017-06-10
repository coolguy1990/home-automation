const log = require('js-logging');
const path = require('path');

const customLogFileOptions = {
  path: path.join(__dirname, '..', 'log'),
  filename: 'homeauto',
  filenameDateFormat: 'yyyy-mm-dd',
  /* eslint-disable */
  pathFormat: '${path}/${filename}${filenameDateFormat}.log',
  lineEnding: '\r\n',
  format: "${timestamp} <${title}> ${file}:${line} ${method} ${message}",
  dateformat: "isoDateTime",
  level: 'debug',
  methods: ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency']
  /* eslint-enable */
};

const Log = log.dailyFile(customLogFileOptions);

module.exports = Log;
