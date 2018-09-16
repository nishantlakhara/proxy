import { Component, OnInit } from '@angular/core';
import { Vendor } from '../table/vendor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {
  vendor = new Vendor(0, 'Any Firm','Any GST number');
  vendorUrl: string = "resource/vendors";

  submitted = false;

  onSubmit() {
    this.addNewVendor();
    this.submitted = true;
    console.log("Form submitted")
  }

  constructor(private http: HttpClient,
              private vendorService: VendorService) { }

  ngOnInit() {
  }

  newVendor() {
    this.vendor = new Vendor(5, 'MyFirm', 'MYGST');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.vendor); }

  addNewVendor() {
    this.vendorService.addNewVendor(this.vendor);
  }

}
