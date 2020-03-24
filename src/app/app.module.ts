import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HeaderListComponent} from './header-list/header-list.component';
import {httpInterceptorProviders} from './http-interceptors';
import {CustomErrorHandler} from './error-handler/custom-error-handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: ErrorHandler, useClass: CustomErrorHandler},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
