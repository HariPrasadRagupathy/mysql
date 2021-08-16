
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.Console({
            level: 'error',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.json()
        }),
        new transports.Http({
            level: 'warn',
            format: format.json()
        }),
        new transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' }),
        new transports.Console({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'rejections.log' })
    ]
});

module.exports = logger