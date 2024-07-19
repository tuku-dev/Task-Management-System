import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postMethod(url: string, data: any) {
    return this.http.post(this.apiUrl + url, data);
  }

  getMethod(url: string) {
    return this.http.get(this.apiUrl + url);
  }
}
