import { Component, OnInit, NgModule } from '@angular/core';
import { AdventureTimeService } from '../adventure-time.service';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vendor } from './vendor'
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { VendorFormComponent } from '../vendor-form/vendor-form.component'

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
  vendorUrl: string = "resource/vendors";

  constructor(private app: AppService,
              private atService: AdventureTimeService,
              private http: HttpClient,
              private router: Router) {
     this.columns = this.atService.getColumns();
     this.characters = this.atService.getCharacters();
     this.vendorcolumns = ["vendorId", "firmName", "gstnumber"];

     this.http.get('resource/vendors').subscribe(res => this.vendordata = res as Vendor[]);
     console.log(this.vendorcolumns);
  }

  authenticated() {
      return this.app.authenticated;
  }

  getAllVendors() {
    this.http.get(this.vendorUrl).subscribe(res => this.vendordata = res as Vendor[]);
    console.log("constructor called");
  }

  navigate(url: string) {
     this.router.navigateByUrl(url);
  }

    getVendor(vendorId) {
      return this
              .http
              .get(this.vendorUrl+"/"+vendorId)
              .map(res => {
                return res;
              });
    }

    updateCoin(name, price, id) {
      const uri = 'http://localhost:4000/coins/update/' + id;

      const obj = {
        name: name,
        price: price
      };
      this
        .http
        .post(uri, obj)
        .subscribe(res => console.log('Done'));
    }

    deleteCoin(id) {
      const uri = 'http://localhost:4000/coins/delete/' + id;

          return this
              .http
              .get(uri)
              .map(res => {
                return res;
              });
    }

    private handleError (error: Response | any) {
    	console.error(error.message || error);
    	return Observable.throw(error.status);
    }
}
