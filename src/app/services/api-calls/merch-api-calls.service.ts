import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchApiCallsService {
  constructor(private http: HttpClient) {}

  getAllMerchStock(): Observable<HttpResponse<Object>> {
    return this.http.get(
      'https://jsonplaceholder.typicode.com/posts/', 
      {
        responseType: 'json',
        observe: 'response',
      }
    );
  }

  addNewMerch(newMerch: any): Observable<HttpResponse<Object>> {
    return this.http.post(
      'https://jsonplaceholder.typicode.com/posts/',
      newMerch,
      { 
        responseType: 'json', 
        observe: 'response',
      }
    );
  }
}
