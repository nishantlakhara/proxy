import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vendor } from './table/vendor'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VendorService {
  vendordata: Vendor[];
  vendorUrl: string = "resource/vendors";

  constructor(private http: HttpClient) { }

  getAllVendors(): Observable<Vendor[]> {
      return this.http.get(this.vendorUrl);
      //.subscribe(res => this.vendordata = res as Vendor[]);
  }

  deleteVendor(id: number) {
      const uri = this.vendorUrl + "/" + id;
      this.http
          .delete(uri)
          .subscribe(res => console.log(res));
  }

  updateVendor(id: number, vendor: Vendor) {
    const uri = this.vendorUrl + "/" + id;
    return this
              .http
              .put(uri, vendor)
              .subscribe(response => console.log(response));
  }

  addNewVendor(vendor: Vendor) {
          return this
            .http
            .post(this.vendorUrl, vendor)
            .subscribe(response => console.log(response));
  }
}
