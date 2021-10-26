import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {NgForageCache} from 'ngforage';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private ngForageCache: NgForageCache) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    return from(this.ngForageCache.getCached<HttpEvent<unknown>>(request.url))
      .pipe(
        switchMap(cachedItem => {
          if (cachedItem.hasData && !cachedItem.expired) {
            // @ts-ignore
            const cachedResponse = JSON.parse(cachedItem.data);

            return of(new HttpResponse(cachedResponse));
          }

          return next.handle(request).pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                // Storing 'event' throws an error (why?) so I need to stringify it.
                this.ngForageCache.setCached(request.url, JSON.stringify(event), 1000 * 60 * 3)
                  .catch(e => {
                    console.error(`Error caching ${request.url}:`, e);
                  });
              }
            })
          );
        })
      );
  }
}
