import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ErrorHandleComponent } from './error-handle/error-handle.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  _isLoading: boolean = true;
  constructor(private http: HttpClient, public modalService: NgbModal) {}

  postMethod(url = '', data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }

  handleError(error: any) {
    let modalRef = this.modalService.open(ErrorHandleComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = error;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }
}
