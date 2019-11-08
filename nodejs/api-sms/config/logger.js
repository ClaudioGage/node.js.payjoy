var winston = require('winston');

const { createLogger, format, transports, stream } = require('winston');

var logger = createLogger({
    format: format.combine(
        format.simple(), 
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/log-api.log`
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
