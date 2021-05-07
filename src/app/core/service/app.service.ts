import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

    //to check null or undefined
    checkNullOrUndefined(val) {
      if (val === null || val === undefined) {
        return true;
      } else {
        return false;
      }
    }
  
}
