import { HOSPITAL, SLOTS } from '../../../core/enums/urls';
import { CommonService } from '../../../core/service/common.service';
import { HttpMethod } from '../../../core/enums/http-handlers';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vaccine-info',
  templateUrl: './vaccine-info.component.html',
  styleUrls: ['./vaccine-info.component.scss']
})
export class VaccineInfoComponent implements OnInit {

  vaccineData: any;
  listOfSlots = [];
  searchText: string;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.vaccineData = JSON.parse(sessionStorage.getItem('vaccine_id'));
    this.getSlots();
  }

  getSlots(value?): any {
    this.listOfSlots = [];
    if (value) {
      this.vaccineData.date = value
    }
    const params = new HttpParams()
      .set("date", this.vaccineData.date)
      .set("districtName", this.vaccineData.districtName)
      .set("district_id", this.vaccineData.district_id)
      .set("stateId", this.vaccineData.stateId)

    this.commonService.commonApiCall(
      SLOTS.slots + '?' + params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfSlots = res.data;
        }
      }
    );
  }

  goToLink() {
    window.open('https://selfregistration.cowin.gov.in/', "_blank");
  }


}
