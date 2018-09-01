import { Component, OnInit, NgModule } from '@angular/core';
import { AdventureTimeService } from '../adventure-time.service';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vendor } from './vendor'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  characters: Observable<any[]>;

  columns: string[];
  vendordata: Vendor[];
  vendorcolumns: string[];

  constructor(private app: AppService,private atService: AdventureTimeService, private http: HttpClient) {
     this.columns = this.atService.getColumns();
     this.characters = this.atService.getCharacters();
     this.vendorcolumns = ["vendorId", "firmName", "gstnumber"];
     console.log(this.vendorcolumns);
  }

  authenticated() {
      console.log("Inside authenticated method 1" + this.app.authenticated);
      return this.app.authenticated;
  }

  calldata() {
    this.http.get('resource/vendors').subscribe(res => this.vendordata = res as Vendor[]);
    console.log("constructor called");
  }


}
