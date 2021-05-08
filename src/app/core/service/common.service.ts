import { HttpMethod } from './../enums/http-handlers';
import { AlertService } from './alert.service';
import { AlertInfo } from './../enums/alert-info';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiService: ApiService,
    private appService: AppService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService) { }

  apiHandler(methodType, url, requestObj) {
    switch (methodType) {
      case HttpMethod.POST:
        return this.apiService.commonPostHandler(url, requestObj);
      case HttpMethod.PUT:
        return this.apiService.commonPutHandler(url, requestObj);
      case HttpMethod.DELETE:
        return this.apiService.commonDeleteHandler(url);
      case HttpMethod.GET:
        return this.apiService.commonGetHandler(url);
    }
  }
  // common Post Api need to use in all screens
  commonApiCall(url, methodType, requestObj, callBack) {
    this.spinner.show();
    this.apiHandler(methodType, url, requestObj).subscribe(
      (res) => {
        // if (
        //   !this.appService.checkNullOrUndefined(res) &&
        //   res.hasOwnProperty('response')
        // ) {
        //   if (res.hasOwnProperty('isSuccess') && res.isSuccess) {
        //     this.getMessages(res, AlertInfo.SUCCESS, methodType);

        //     callBack(res.response, true);
        //   } else if (res.hasOwnProperty('isSuccess') && !res.isSuccess) {
        //     this.getMessages(res, AlertInfo.ERROR, methodType);
        //     // this.spinner.hide();
        //     callBack(res.response, false);
        //   }
        // }
        if (!this.appService.checkNullOrUndefined(res)) {
          callBack(res, true)
        } else {
          callBack(res, false)
        }

      },
      (error) => {
        // this.spinner.hide();
        callBack(null, false);
        this.alertService.showMessage(AlertInfo.ERROR, error);
      }
    );
  }

  private getMessages(res: any, type, methodType) {
    if (methodType == HttpMethod.GET && type == AlertInfo.SUCCESS) {
      return;
    }
    if (
      !this.appService.checkNullOrUndefined(res.endUserMessage) &&
      res.endUserMessage != ''
    ) {
      this.alertService.showMessage(type, res.endUserMessage);
    }
  }
}
