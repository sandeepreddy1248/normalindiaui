import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {
  reportForm: FormGroup;
  bedValue: any;
  viewVaccineBedMode = 'notavaliable';
  viewOxygenBedMode= 'avaliable';
  viewICUBedMode = 'notavaliable';
  viewRegularBedMode = 'avaliable';

  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createReportForm();
  }


  createReportForm(){
    this.reportForm = this.fb.group({
      name: [''],
      regularBed: ['avaliable'],
      icuBed: ['notavaliable'],
      oxygenBed: ['avaliable'],
      vaccine: ['notavaliable'],
      comment: ['']
    })
  }

  submitReport(formdata){
    debugger;
    this.reportForm.controls.regularBed.setValue('');
    console.log(formdata);
    this.reportForm.reset();
  }

  resetReport(){
    this.reportForm.reset();
  }
  vaccineEvent(value:any){
    this.bedValue = value;
  }


}
