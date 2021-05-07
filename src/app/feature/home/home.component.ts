import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listOfHospitals = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  // getCases() {
  //   const url = CASE.CaseUrl;
  //   this.commonService.commonApiCall(
  //     url,
  //     HttpMethod.GET,
  //     null, (res, statusFlag) => {
  //       // this.spinner.hide();
  //       if (statusFlag) {

  //       }
  //     }
  //   );
  // }

  getHospitals(): any {
    this.http.get('../../../assets/Data/ts.json').subscribe((data: any[]) => {
      if (data) {
        this.listOfHospitals = data;
      }
    });
  }


  checkHospitalDetails(hospName) {
   this.router.navigate(['/hospitainfo/', hospName]);
  }


}
