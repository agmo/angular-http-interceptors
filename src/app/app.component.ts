import {Component} from '@angular/core';
import {AppService} from './app.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

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
  error: string;
  regularHeaders$: Observable<any>;

  constructor(private appService: AppService) {
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
          this.error = err.message;

          return of({});
        })
      );
  }
}
