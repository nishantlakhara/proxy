import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    console.log("Inside home constructor");
    http.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.app.authenticated; }

  navigate(url: string) {
       this.router.navigateByUrl(url);
  }
}
