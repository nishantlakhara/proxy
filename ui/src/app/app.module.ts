import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './app.service';
import { AdventureTimeService } from './adventure-time.service';
import { VendorService } from './vendor.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { TableComponent } from './table/table.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //var xhr;
    //if(req.headers.get('X-XSRF-TOKEN') != null) {
    //  console.log('I am here' + req.headers.get('X-XSRF-TOKEN'))
    //  xhr = req.clone({
    //        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    //                           .set('X-CSRF-TOKEN', req.headers.get('X-XSRF-TOKEN'))
    //                           .set('_csrf', req.headers.get('X-XSRF-TOKEN'))
    //
    //      });
    //} else {
      const xhr = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      });
    //}

    return next.handle(xhr);
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'table', component: TableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TableComponent,
    VendorFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService, AdventureTimeService, VendorService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
