import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../app/core/service/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  hospital_id: string;
  params: any;
  hospitalDetails: any = {};
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.hospital_id;
    this.route.paramMap.subscribe(paramMap => {
      this.hospital_id = paramMap.get('hospital_id');
      this.getHospitalDetails(this.hospital_id);
    })
  }


  openModal(template: TemplateRef<any>) {
    this.createReportForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-width' });
  }

  getHospitalDetails(hospital_id) {
    this.params = new HttpParams().set("id", hospital_id)
    this.commonService.commonApiCall(
      HOSPITAL.GethospitalbyidUrl + '?' + this.params,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.hospitalDetails = res;
          this.createReportForm();
        }
      }
    );
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
    if (this.hospitalDetails.org.report.information.length) {
      for (let h = 0; h < this.hospitalDetails.org.report.information.length; h++) {
        if (this.hospitalDetails.org.report.information[h].type === 'NORMAL BED') {
          this.reportForm.patchValue({
            regularBed: this.hospitalDetails.org.report.information[h].available ? true : false
          })
        } else if (this.hospitalDetails.org.report.information[h].type === 'OXYGEN') {
          this.reportForm.patchValue({
            oxygenBed: this.hospitalDetails.org.report.information[h].available ? true : false
          })
        } else if (this.hospitalDetails.org.report.information[h].type === 'ICU BED') {
          this.reportForm.patchValue({
            icuBed: this.hospitalDetails.org.report.information[h].available ? true : false
          })
        }
      }
    }
  }

  submitReport() {
    if (this.reportForm.invalid) {
      return;
    }
    this.hospitalDetails
    this.commonService.commonApiCall(
      HOSPITAL.addReport,
      HttpMethod.POST,
      this.hospitalDetails, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.getHospitalDetails(this.hospital_id);
        }
      }
    );

  }

  resetReport() {
    this.reportForm.reset();
  }

  vaccineEvent(value: any) {
    this.bedValue = value;
  }


  setAvaliablity(value, key) {
    this.reportForm.patchValue({
      [key]: value
    })
  }

}
