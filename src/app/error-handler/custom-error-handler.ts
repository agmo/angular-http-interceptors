import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorLoggerService} from './error-logger.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private toastrService: ToastrService;

  constructor(private errorLoggerService: ErrorLoggerService, private injector: Injector) {
  }

  handleError(error: any): void {
    // Injecting the ToastrService into the constructor results in a cyclic dependency error. Using the injector as a workaround.
    if (!this.toastrService) {
      this.toastrService = this.injector.get(ToastrService);
    }

    console.error(error);
    this.toastrService.error(
      'An error was intercepted by the custom error handler. See the dev console for error details.',
      'Error Handler',
      {onActivateTick: true});
    this.errorLoggerService.logError(error).subscribe();
  }
}
