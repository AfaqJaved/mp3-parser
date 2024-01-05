import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class LoggerService {
  private readonly errorColor = chalk.red.bold;
  private readonly warnColor = chalk.yellow.bold;
  private readonly infoColor = chalk.green.bold;
  private readonly currentTimeStamp = new Date();

  error(message: string) {
    console.error(this.errorColor(`[Error : ${this.currentTimeStamp}] ${message}`));
  }

  warn(message: string) {
    console.warn(this.warnColor(`[Warn : ${this.currentTimeStamp}] ${message}`));
  }

  log(message: string) {
    console.log(this.infoColor(`[Info : ${this.currentTimeStamp}] ${message}`));
  }
}