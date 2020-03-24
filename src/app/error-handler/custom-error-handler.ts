import {ErrorHandler, Injectable} from '@angular/core';
import {ErrorLoggerService} from './error-logger.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private errorLoggerService: ErrorLoggerService, private toastrService: ToastrService) {
  }

  handleError(error: any): void {
    console.error(error);
    this.toastrService.error(
      'An error was intercepted by the custom error handler. See the dev console for error details.',
      'Error Handler',
      {onActivateTick: true});
    this.errorLoggerService.logError(error).subscribe();
  }
}
