import {Component} from '@angular/core';
import {AppService} from './app.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

interface IHeaderRes {
  headers: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customHeaders$: Observable<any>;
  regularHeaders$: Observable<any>;

  constructor(private appService: AppService, private toastrService: ToastrService) {
  }

  sendBypassingInterceptor() {
    this.regularHeaders$ = this.send(true);
  }

  sendViaInterceptor() {
    this.customHeaders$ = this.send(false);
  }

  private send(bypass: boolean) {
    return this.appService.test(bypass)
      .pipe(
        map((data: IHeaderRes) => data.headers),
        catchError(err => {
          this.toastrService.error(`There was an error. Make sure the server is up and running and try again. ${err.message}`);

          return throwError(err);
        })
      );
  }

  simulateError() {
    this.appService.simulateError().subscribe();
  }
}
