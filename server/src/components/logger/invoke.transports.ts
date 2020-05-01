import { format, transports, } from 'winston';
import { TransformableInfo } from 'logform';

import {
  LoggingComponentOptions,
  LOGGER_LEVEL
} from '../logger';

export namespace InvokeFactory {

  export function createConsole(options: LoggingComponentOptions) {

    const console_format = (info: TransformableInfo) => {
      let msg: string = '';
      msg += `<${info.level.toUpperCase()}> ip=${info.ip} - `;
      if (info.time)
        msg += `time=${info.time}ms - `;
      if (info.statusCode)
        msg += `statusCode=${info.statusCode} - `;
      if (info.methodName)
        msg += `method=${info.className}.${info.methodName}`;
      if (options.stack_trace && info.error)
        msg += `\n${info.error}`;
      return msg;
    };

    return new transports.Console({
      level: options.level,
      format: format.printf(console_format)
    })
  }

  export function createCombined(options: LoggingComponentOptions) {

    const combined_format = (info: TransformableInfo) => {
      let msg: string = '';
      msg += `[${info.timestamp}] - <${info.level.toUpperCase()}> ip=${info.ip} - `;
      if (info.time)
        msg += `time=${info.time}ms - `;
      if (info.statusCode)
        msg += `statusCode=${info.statusCode} - `;
      if (info.methodName)
        msg += `method=${info.className}.${info.methodName}`;
      return msg;
    };

    return new transports.File({
      dirname: options.path,
      filename: 'combined.log',
      level: options.level,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(combined_format)
      )
    })
  }

  export function createError(options: LoggingComponentOptions) {

    const error_format = (info: TransformableInfo) => {
      let msg: string = '';
      msg += `[${info.timestamp}]: ip=${info.ip} - statusCode=${info.statusCode} - `;
      if (info.className !== undefined)
        msg += `Unhandled error in ${info.className}.${info.methodName}`;
      else if (info.url !== undefined)
        msg += `Unhandled error in ${info.url}`;
      if (info.error)
        msg += `\n${info.error}\n`;
      return msg;
    };

    return new transports.File({
      dirname: options.path,
      filename: 'error.log',
      level: LOGGER_LEVEL.ERROR,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(error_format)
      )
    })
  }
}
