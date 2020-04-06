import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {ErrorLoggerService} from '../error-handler/error-logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private errorLoggerService: ErrorLoggerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let userFacingErrorMessage;

          if (this.isClientSideError(error)) {
            userFacingErrorMessage = `A client-side or network error occurred: ${error.message}`;
          } else {
            userFacingErrorMessage = `A backend error occurred: ${error.status}, ${error.message}`;
          }

          this.toastrService.error(
            userFacingErrorMessage,
            'Error Interceptor',
            {onActivateTick: true});

          // Errors could be logged here. Uncomment to test it out.
          // this.errorLoggerService.logError(userFacingErrorMessage).subscribe();

          return throwError(error);
        })
      );
  }

  private isClientSideError(error) {
    return error instanceof ErrorEvent;
  }
}
