import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpBackendClient} from './http-interceptors/http-backend-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, private httpBackendClient: HttpBackendClient) {
  }

  test(bypass: boolean) {
    if (bypass) {
      return this.httpBackendClient.get('/api/test');
    } else {
      return this.httpClient.get('/api/test');
    }
  }

  simulateError() {
    return this.httpClient.get('/noop');
  }
}
