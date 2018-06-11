import { Logger, LoggerInstance, transports } from 'winston';

interface IConsoleLoggerOptions {
    level: string;
    handleExceptions: boolean;
    json: boolean;
    colorize: boolean;
}

interface IFileLoggerOptions extends IConsoleLoggerOptions {
    filename: string;
    maxsize: number;
    maxFiles: number;
}

const isPro: boolean = process.env.NODE_ENV === 'production';

const consoleOptions: IConsoleLoggerOptions = {
    colorize: true,
    handleExceptions: true,
    json: false,
    level: 'debug',
};

const fileOptions: IFileLoggerOptions = {
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
