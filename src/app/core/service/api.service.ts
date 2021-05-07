import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
