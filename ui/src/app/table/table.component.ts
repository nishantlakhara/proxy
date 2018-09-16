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
  selected: Vendor;
  vendorEmpty: Vendor = new Vendor(0,'','');
//  showTable: boolean = false;

  constructor(private app: AppService,
              private atService: AdventureTimeService,
              private vendorService: VendorService,
              private http: HttpClient,
              private router: Router) {
     console.log("Inside vendor constructor")
     this.getAllVendors();
     this.selected = this.vendorEmpty;
  }

  authenticated() {
     console.log("Inside authenticated");
    // return true;
     return this.app.authenticated;
  }

  getAllVendors() {
//     this.showTable = false;
     this.vendorService.getAllVendors().subscribe(res => this.vendordata = res as Vendor[]);
//     setTimeout(()=>{this.showTable = true}, 0);
     //var vendor1 = new Vendor(1, 'MyFirm', 'MYGST');
     //var vendor2 = new Vendor(2, 'MyFirm', 'MYGST');
     //var vendorArray = new Array<Vendor>();
     //vendorArray[0] = vendor1;
     //vendorArray[1] = vendor2;
     //this.vendordata = vendorArray;
     this.selected = this.vendorEmpty;
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
    if(confirm("Are you sure to delete vendor with id : "+id)) {
      console.log("Deleting the vendor");
      this.vendorService.deleteVendor(id);
      this.vendordata.splice(idx, 1);
    }
  }

  updateVendor(id: number, vendor: Vendor) {
    this.selected = vendor;
  }

  saveVendor(id: number, vendor: Vendor) {
    this.vendorService.updateVendor(id, vendor);
    this.selected = this.vendorEmpty;
  }

  isselected(vendor: Vendor) {
    if(this.selected.vendorId == vendor.vendorId) {
      return true;
    }
    return false;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
