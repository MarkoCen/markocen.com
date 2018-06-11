import { ConsoleTransportOptions, FileTransportOptions, Logger, LoggerInstance, transports } from 'winston';

const isPro: boolean = process.env.NODE_ENV === 'production';

const consoleOptions: ConsoleTransportOptions = {
    colorize: true,
    handleExceptions: true,
    json: false,
    level: 'debug',
};

const fileOptions: FileTransportOptions = {
    colorize: false,
    filename: `${process.cwd()}/logs/app.log`,
    handleExceptions: true,
    json: true,
    level: 'info',
    maxFiles: 5,
    maxsize: 5242880,
};

const logger: LoggerInstance = isPro ?
    new Logger({
        exitOnError: false,
        transports: [
            new transports.File(fileOptions),
        ],
    })
    :
    new Logger({
        exitOnError: false,
        transports: [
            new transports.Console(consoleOptions),
        ],
    });

export default logger;
