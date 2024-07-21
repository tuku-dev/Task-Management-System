import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusPipe } from '../task-list/status.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [StatusPipe, CommonModule],
  template: `
    <div class="task-form-container p-3">
      <h4 class="modal-title px-2">
        {{ modalData.title }}
        <span
          class="badge small"
          [ngClass]="{
            'bg-success': modalData.status === 'done',
            'bg-info': modalData.status === 'progress',
            'bg-danger': modalData.status === 'todo'
          }"
          >{{ modalData.status | status }}</span
        >
      </h4>
      <hr class="hr my-2" />
      <div class="task-data" style="min-height: 150px">
        <div class="description">{{ modalData.description }}</div>
      </div>
      <div
        class="button-container d-flex align-items-center justify-content-end gap-3"
      >
        <button
          class="button modal-edit rounded-1 px-3 py-1"
          (click)="dialogRef.close({ success: true })"
        >
          Edit
        </button>
        <button
          class="button modal-cancel rounded-1 px-3 py-1"
          (click)="dialogRef.close({ success: false })"
        >
          close
        </button>
      </div>
    </div>
  `,
  styles: `
  .modal-title {
    .badge {
      font-size: 14px;
      font-weight: normal;
    }
  }
  .button-container {
    .button {
      font-size: 14px;
      width: 100px;
    }
    .modal-cancel {
      border: 1px solid var(--bs-secondary);
      background-color: transparent;
    }
    .modal-edit {
      background-color: #b9ddff;
      border: 1px solid #2395f3;
    }
  }`,
})
export class ViewTaskComponent {
  @Input() modalData: any;

  constructor(public dialogRef: NgbActiveModal) {}
}
