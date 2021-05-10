import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../app/core/service/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HOSPITAL } from '../../../../app/core/enums/urls';
import { HttpMethod } from '.././../../../app/core/enums/http-handlers';
import { HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {
  reportForm: FormGroup;
  bedValue: any;
  viewVaccineBedMode = 'notavaliable';
  viewOxygenBedMode = 'avaliable';
  viewICUBedMode = 'notavaliable';
  viewRegularBedMode = 'avaliable';
  hospital_id: string;
  params: any;
  hospitalDetails: any ={};
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    let hospital_id;
    this.route.paramMap.subscribe(paramMap => {
      hospital_id = paramMap.get('hospital_id');
    })
    this.getHospitalDetails(hospital_id);
    this.createReportForm();
  }
  
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getHospitalDetails(hospital_id) {
    this.params = new HttpParams()
      .set("id", hospital_id)
    this.commonService.commonApiCall(
      HOSPITAL.GethospitalbyidUrl + '?' + this.params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.hospitalDetails = res;
        }
      }
    );
  }

  createReportForm() {
    this.reportForm = this.fb.group({
      name: [''],
      regularBed: ['avaliable'],
      icuBed: ['notavaliable'],
      oxygenBed: ['avaliable'],
      vaccine: ['notavaliable'],
      comment: ['']
    })
  }

  submitReport(formdata) {
    this.reportForm.controls.regularBed.setValue('');
    console.log(formdata);
    this.reportForm.reset();
  }

  resetReport() {
    this.reportForm.reset();
  }
  vaccineEvent(value: any) {
    this.bedValue = value;
  }


}
