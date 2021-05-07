import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  commonPostHandler(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  commonGetHandler(url: string): Observable<any> {
    return this.http.get(url);
  }
  commonGetByHandler(url: string): Observable<any> {
    return this.http.get(url);
  }

  commonPutHandler(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  commonDeleteHandler(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
