import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class BaseDataService {
  
    baseUrl: string;
    constructor(private http: HttpClient) {
      this.baseUrl = environment.api;
    }
  
    makeGetCall(path: string): Observable<any> {
      let headers = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });
      return this.http.get(this.constructUrl(path), { headers: headers })
    }
  
    makePostCall(path: string, body: any): Observable<any> {
      let bodyJson = JSON.stringify(body);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
      return this.http.post(this.constructUrl(path), bodyJson, { headers: headers })
    }
  
    private constructUrl(path: string) {
      return this.baseUrl + path;
    }
  }