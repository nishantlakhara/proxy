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
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  characters: Observable<any[]>;
  columns: string[];
  vendordata: Vendor[];
  vendorcolumns: string[] = ["vendorId", "firmName", "gstnumber"];
  vendorUrl: string = "resource/vendors";

  constructor(private app: AppService,
              private atService: AdventureTimeService,
              private vendorService: VendorService,
              private http: HttpClient,
              private router: Router) {
     this.columns = this.vendorService.getColumns();
     this.characters = this.atService.getCharacters();
  }

  authenticated() {
     if(this.app.authenticated) {
        this.getAllVendors();
     }
    // return true;
     return this.app.authenticated;
  }

  getAllVendors() {
     this.vendordata = this.vendorService.getAllVendors();
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

  deleteVendor(id: number, idx: number) {
    this.vendorService.deleteVendor(id);
    this.vendordata.splice(idx, 1);
  }

  updateVendor(id: number, vendor: Vendor) {
    this.vendorService.updateVendor(id, vendor);
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
