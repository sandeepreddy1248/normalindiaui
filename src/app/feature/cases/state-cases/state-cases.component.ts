import { HttpMethod } from './../../../core/enums/http-handlers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CASE } from 'src/app/core/enums/urls';
import { CommonService } from 'src/app/core/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-state-cases',
  templateUrl: './state-cases.component.html',
  styleUrls: ['./state-cases.component.scss']
})
export class StateCasesComponent implements OnInit {

  constructor(private activatedRouted: ActivatedRoute, private commonService: CommonService, private spinner: NgxSpinnerService) { }

  selectedState: any;
  dummy: any
  selectedStateData: any;
  ssConfirmedCases: number
  ssRecoveredCases: number;
  ssDiedPeople: number;
  ssTested: number
  stateNamesInIndia: any = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattisgarh",
    DL: "Delhi",
    DN: "Dadra and Nagar Haveli",
    GA: "Goa",
    GJ: "Gujarat",
    HP: "Himachal Pradesh",
    HR: "Haryana",
    JH: "Jharkhand",
    JK: "Jammu and Kashmir",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    MH: "Maharashtra",
    ML: "Meghalaya",
    MN: "Manipur",
    MP: "Madhya Pradesh",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PB: "Punjab",
    PY: "Puducherry",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TG: "Telangana",
    TN: "Tamil Nadu",
    TR: "Tripura",
    UN: "Unassigned",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
  };
  selectedStateInfo = []
  ngOnInit() {
    this.selectedState = this.activatedRouted.snapshot.params[""];
    this.getStateCases()
  }

  getStateCases() {
    const url = CASE.CaseUrl;
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null, (res, statusFlag) => {
         this.spinner.hide();
        if (statusFlag) {
          this.selectedStateData = res[this.selectedState];
          this.ssConfirmedCases = this.selectedStateData['total']['confirmed']
          this.ssRecoveredCases = this.selectedStateData['total']['recovered']
          this.ssDiedPeople = this.selectedStateData['total']['deceased'] == undefined
            ? 0
            : this.selectedStateData["total"]["deceased"],
            this.ssTested = this.selectedStateData['total']['tested']
          //console.log(this.selectedStateData);

          const stateInfo = this.selectedStateData['districts']
          //console.log(stateInfo);
          Object.keys(stateInfo).forEach((Key, index) => {
            this.selectedStateInfo.push({
              districtName: Key,
              distConfirmed: stateInfo[Key]['total']['confirmed'],
              distRecovered: stateInfo[Key]['total']['recovered'] == undefined ? 0 : stateInfo[Key]['total']['recovered'],
              distDied: stateInfo[Key]['total']['deceased'] == undefined
                ? 0
                : stateInfo[Key]['total']['deceased'],
              distTested: stateInfo[Key]['total']['tested'],
              todayConfirmed: stateInfo[Key]['delta'] == undefined ? '' : stateInfo[Key]['delta']['confirmed'],
              todayRecovered: stateInfo[Key]['delta'] == undefined ? '' : stateInfo[Key]['delta']['recovered'],
              todayDied: stateInfo[Key]['delta'] == undefined ? '' : stateInfo[Key]['delta']['deceased']
            })
          })
        }

      })
  }
}
