import {
  format,
  transports
} from 'winston';

import {
  LoggingComponentOptions,
} from '../logger';

export namespace DefaultFactory {

  export function createConsole(options: LoggingComponentOptions) {
    return new transports.Console({
      level: options.level,
      format: format.printf(
        info => `<${info.level.toUpperCase()}> ${info.message}`)
    })
  }

  export function createCombined(options: LoggingComponentOptions) {
    return new transports.File({
      dirname: options.path,
      filename: 'combined.log',
      level: options.level,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          info => `[${info.timestamp}] - <${info.level.toUpperCase()}> ${info.message}`)
      )
    })
  }
}
