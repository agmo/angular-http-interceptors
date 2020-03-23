import {ErrorHandler, Injectable} from '@angular/core';
import {ErrorLoggerService} from './error-logger.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private errorLoggerService: ErrorLoggerService) {
  }

  handleError(error: any): void {
    console.error(error);

    this.errorLoggerService.logError(error).subscribe();
  }
}
