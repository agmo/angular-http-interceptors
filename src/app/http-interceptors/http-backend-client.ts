// https://github.com/angular/angular/issues/20203#issuecomment-369754776

import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendClient extends HttpClient {
  constructor(handler: HttpBackend) {
    super(handler);
  }
}
