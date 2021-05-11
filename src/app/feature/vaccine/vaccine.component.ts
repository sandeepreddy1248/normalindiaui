import { HOSPITAL, SLOTS } from './../../core/enums/urls';
import { CommonService } from './../../core/service/common.service';
import { HttpMethod } from './../../core/enums/http-handlers';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  @ViewChild('distric') distric: ElementRef;
  @ViewChild('stateEl') stateEl: ElementRef;
  @ViewChild('pinCodeEl') pinCodeEl: ElementRef;



  listOfSlots = [];
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
    this.getStates();
    this.pinCodeFoucus();
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



  search() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    const params = new HttpParams()
      .set("districtName", this.listOfDistrict.find(res => res.district_id === +this.form.get('district').value).district_name)
      .set("district_id", this.form.get('district').value)
    this.slotsOfLists(params);

  }



  searchByPin() {
    if (this.pinForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    const params = new HttpParams()
      .set("pincode", this.pinForm.value.pinCode)

    this.slotsOfLists(params);
  }

  slotsOfLists(params) {
    this.listOfSlots = [];
    this.commonService.commonApiCall(
      SLOTS.SlotsDate + '?' + params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag && res.slot_info.length) {
          this.listOfSlots = res.slot_info;
        }
      }
    );
  }

  // ?date=2021-05-11&districtName=Karimnagar&stateId=32&district_id=589&language=en

  checkVaccDetails(vaccDate) {
    const obj = {
      date: vaccDate,
      districtName: this.listOfDistrict.find(res => res.district_id === +this.form.get('district').value).district_name,
      stateId: this.form.get('state').value,
      district_id: this.form.get('district').value,
    }
    sessionStorage.setItem('vaccine_id', JSON.stringify(obj))
    this.router.navigate(['vaccine/vaccineinfo']);
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
    // this.listOfSlots = [];
    if (event.id == "tab1") {
      this.pinCodeFoucus();
      // this.clearStateCountryInputs();
    } else {
      // this.clearPincode();
      this.stateFocus();
    }
  }




}
