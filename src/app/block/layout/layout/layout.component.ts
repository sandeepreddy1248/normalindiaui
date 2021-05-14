import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/service/common.service';
import { HttpMethod } from './../../../core/enums/http-handlers';
import { Component, OnInit } from '@angular/core';
import { COMPONENTS } from 'src/app/core/enums/urls';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HOSPITAL } from '../../../core/enums/urls';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  params: HttpParams;
  listOfComponents = [];
  childLists = [];
  selectedMode = 'Bed';
  selectedChildMode = 'All';

  submitted = false;
  listOfStates = [];
  listOfDistrict = [];
  form: FormGroup;

  pinForm = new FormGroup({
    pinCode: new FormControl('', Validators.required),
  });

  filterList = [];


  constructor(private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      state: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required)
    });
    this.getComponentdata();
    this.getStates();
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
        }
      }
    );
  }


  getComponentdata() {
    this.commonService.commonApiCall(
      COMPONENTS.getComponentdata,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfComponents = res.map(res => {
            res.componentvalues = res.componentvalues.split(",")
            return res;
          });
          this.childList(this.selectedMode);
        }
      }
    );
  }

  fecthdata() {
    this.submitted = true;
    const params = new HttpParams()
      .set("state", this.listOfStates.find(res => res.state_id == +this.form.get('state').value).state_name)
      .set("district", this.listOfDistrict.find(res => res.district_id == +this.form.get('district').value).district_name)
      .set("type", this.selectedMode)
      .set("subtype", this.selectedChildMode)

    this.commonService.commonApiCall(
      COMPONENTS.fecthdata + '?' + params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.filterList = res;
        }
      }
    );
  }

  setBedType(type) {
    switch (type) {
      case 'Normal':
        return 'Regular Bed';
      case 'ICU':
        return 'ICU Bed';
      case 'Oxigen':
        return 'Oxigen Bed';
    }
  }

  childList(child) {
    this.selectedMode = child;
    this.childLists = [];
    this.childLists = this.listOfComponents.find(res => res.componentname === child).componentvalues;
  }

  selectedChild(data) {
    this.selectedChildMode = data;
  }

}
