import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../core/service/common.service';
import { HttpMethod } from './../../../core/enums/http-handlers';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { COMPONENTS } from '../../../core/enums/urls';

import { HOSPITAL } from '../../../core/enums/urls';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  pinForm: FormGroup;
  modalRef: BsModalRef;
  reportForm: FormGroup;


  filterList = [];


  constructor(private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      state: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required)
    });
    this.pinForm = new FormGroup({
      pinCode: new FormControl('', Validators.required),
    });

    this.createReportForm();
    this.getComponentdata();
    this.getStates();
  }

  createReportForm() {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required]],
      regularBed: [false, [Validators.required]],
      icuBed: [false, [Validators.required]],
      oxygenBed: [false, [Validators.required]],
      vaccine: [false, [Validators.required]],
      comment: ['']
    });
  }


  setTab() {
    this.submitted = false;
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
    if (this.form.invalid) {
      return;
    }
    const params = new HttpParams()
      .set("state", this.listOfStates.find(res => res.state_id == +this.form.get('state').value).state_name)
      .set("district", this.listOfDistrict.find(res => res.district_id == +this.form.get('district').value).district_name)
      .set("type", this.selectedMode)
      .set("subtype", this.selectedChildMode)
    this.commonCode(COMPONENTS.fecthdata + '?' + params);
  }

  commonCode(url) {
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.filterList = res;
        }
      }
    );
  }

  fetchdatabypin() {
    this.submitted = true;
    if (this.pinForm.invalid) {
      return;
    }
    const params = new HttpParams()
      .set("pincode", this.pinForm.get('pinCode').value)
      .set("type", this.selectedMode)
      .set("subtype", this.selectedChildMode)
    this.commonCode(COMPONENTS.fetchdatabypin + '?' + params);
  }

  openModal(template: TemplateRef<any>, bed, name) {
    this.createReportForm();
    this.reportForm.patchValue({
      name: name
    })
    if (bed.length) {
      for (let h = 0; h < bed.length; h++) {
        if (bed[h].type === 'Normal') {
          this.reportForm.patchValue({
            regularBed: bed[h].available ? true : false
          })
        } else if (bed[h].type === 'OXYGEN') {
          this.reportForm.patchValue({
            oxygenBed: bed[h].available ? true : false
          })
        } else if (bed[h].type === 'ICU') {
          this.reportForm.patchValue({
            icuBed: bed[h].available ? true : false
          })
        }
      }
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-width' });
  }


  submitReport() {
    if (this.reportForm.invalid) {
      return;
    }
    this.commonService.commonApiCall(
      HOSPITAL.addReport,
      HttpMethod.POST,
      this.reportForm.value, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          // this.getHospitalDetails(this.hospital_id);
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
    if (this.childLists.length) {
      this.selectedChildMode = this.childLists[0];
    }
  }

  selectedChild(data) {
    this.selectedChildMode = data;
  }

}
