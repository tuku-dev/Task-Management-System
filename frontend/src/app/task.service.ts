import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  postMethod(url = '', data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
}
