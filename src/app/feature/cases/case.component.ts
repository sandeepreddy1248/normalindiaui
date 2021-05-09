import { HttpMethod } from './../../core/enums/http-handlers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CASE } from 'src/app/core/enums/urls';
import { CommonService } from 'src/app/core/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  allData: number;
  confirmCasesCount: number;
  recoveredCount: number;
  diedCount: number;
  todayConfirmedCases: number;
  todayRecoveredCases: number;
  todayDiedCases: number;
  totalTests: number;
  districtsData: any;
  statesInfo: any = [];

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
  constructor(private commonService: CommonService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCases();
  }



  getCases() {
    const url = CASE.CaseUrl;
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.allData = res;
          // console.log(this.allData);
          this.confirmCasesCount = this.allData["TT"]["total"]["confirmed"];
          this.recoveredCount = this.allData["TT"]["total"]["recovered"];
          this.diedCount = this.allData["TT"]["total"]["deceased"];
          this.todayConfirmedCases = this.allData["TT"]["delta"]["confirmed"];
          this.todayRecoveredCases = this.allData["TT"]["delta"]["recovered"];
          this.todayDiedCases = this.allData["TT"]["delta"]["deceased"];
          this.totalTests = this.allData["TT"]["total"]["tested"];
          Object.keys(this.allData).forEach((Key, index) => {
            if (this.allData[Key]["total"] == undefined) {
              0;
            } else {
            }
            if (this.allData[Key]["total"] == undefined) {
              0;
            } else {
              this.statesInfo.push({
                stateShotCode: [Key],
                stateName: this.stateNamesInIndia[Key],
                confirmedCases: this.allData[Key]["total"] == undefined ? 0 : this.allData[Key]["total"]["confirmed"],
                deceasedCases:
                  this.allData[Key]["total"]["deceased"] == undefined
                    ? 0
                    : this.allData[Key]["total"]["deceased"],
                recoveredCases:
                  this.allData[Key]["total"]["recovered"] == undefined
                    ? 0
                    : this.allData[Key]["total"]["recovered"],
                tested: this.allData[Key]["total"]["tested"] == undefined
                  ? 0
                  : this.allData[Key]["total"]["tested"],
                todayConfirmed: this.allData[Key]['delta'] == undefined ? '' : this.allData[Key]['delta']['confirmed'],
                todayRecovered: this.allData[Key]['delta'] == undefined ? '' : this.allData[Key]['delta']['recovered'],
                todayDied: this.allData[Key]['delta'] == undefined ? '' : this.allData[Key]['delta']['deceased']
              });
            }
          });
          this.statesInfo.splice(32, 1);

        }
      }
    );
  }

  stateData(stateName) {
    var stateShortCode = stateName.toString();
    this.router.navigate(["cases/state/", stateShortCode]);
  }

}
