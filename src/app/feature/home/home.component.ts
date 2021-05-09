import { HOSPITAL } from './../../core/enums/urls';
import { CommonService } from './../../core/service/common.service';
import { HttpMethod } from './../../core/enums/http-handlers';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('distric') distric: ElementRef;
  @ViewChild('stateEl') stateEl: ElementRef;
  @ViewChild('pinCodeEl') pinCodeEl: ElementRef;



  listOfHospitals = [];
  listOfStates = [];
  listOfDistrict = [];
  submitted: boolean;
  pinCode: string = '';
  params: HttpParams;

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) { }

  form = new FormGroup({
    state: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  pinForm = new FormGroup({
    pinCode: new FormControl('', Validators.required),
  });

  get g() {
    return this.form.controls;
  }

  ngOnInit(): void {
    //this.getHospitals();
    this.getStates();
    this.pinCodeFoucus();
  }

  getHospitals(): any {
    this.http.get('../../../assets/Data/ts.json').subscribe((data: any[]) => {
      if (data) {
        this.listOfHospitals = data;
      }
    });
  }
  getStates(): any {
    this.commonService.commonApiCall(
      HOSPITAL.StateUrl,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfStates = res.states;
        }
      }
    );
  }


  getDistrictByState(stateId) {
    this.commonService.commonApiCall(
      HOSPITAL.DistrictUrl + '/' + stateId,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfDistrict = res.districts;
          this.districFoucus();
        }
      }
    );
  }

  checkHospitalDetails(hospName) {
    this.router.navigate(['/hospitainfo/', hospName]);
  }

  search(type?) {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    let val;
    if (type == 'pin') {
      val = this.pinForm.value
    }
    this.submitted = false;
    this.params = new HttpParams()
      .set("pincode", "10")
    this.commonService.commonApiCall(
      HOSPITAL.HospitalByPinCodeUrl + '?' + this.params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfHospitals = res;
        }
      }
    );
  }



  searchByPin() {
    if (this.pinForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    this.params = new HttpParams()
      .set("pincode", this.pinForm.value.pinCode)
    this.commonService.commonApiCall(
      HOSPITAL.HospitalByPinCodeUrl + '?' + this.params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag && res.length) {
          this.listOfHospitals = res;
        } else {
          //implement
        }
      }
    );
  }







  changeState(e) {
    console.log(e.target.value);
  }

  clearStateCountryInputs() {
    this.form.reset();
    this.pinCodeFoucus();
  }

  clearPincode() {
    this.pinCode = '';
  }

  pinCodeFoucus() {
    setTimeout(() => {
      this.pinCodeEl.nativeElement.focus();
    }, 0);
  }

  stateFocus() {
    setTimeout(() => {
      this.stateEl.nativeElement.focus();
    }, 0);
  }

  districFoucus() {
    setTimeout(() => {
      this.distric.nativeElement.focus();
    }, 0);
  }

  onSelect(event) {
    console.log(event);
    // this.listOfHospitals = [];
    if (event.id == "tab1") {
      this.pinCodeFoucus();
      // this.clearStateCountryInputs();
    } else {
      // this.clearPincode();
      this.stateFocus();
    }
  }




}
