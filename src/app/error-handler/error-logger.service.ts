import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor(private httpClient: HttpClient) {
  }

  logError(error) {
    return this.httpClient.post('/api/log', error);
  }
}
