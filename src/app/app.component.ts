import { CASE } from './core/enums/urls';
import { CommonService } from './core/service/common.service';
import { Component } from '@angular/core';
import { HttpMethod } from './block/http-handlar.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'normalindia';
  teamData: any;


  constructor(private commonService: CommonService,
  ) { 
    this.getCases();
  }



  getCases() {
    const url = CASE.CaseUrl;
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        // this.spinner.hide();
        if (statusFlag) {
          this.teamData = res.listResult;
        }
      }
    );


  }
}