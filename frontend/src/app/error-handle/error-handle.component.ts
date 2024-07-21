import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-handle',
  standalone: true,
  imports: [],
  template: `
    <div class="task-form-container p-3">
      <div
        class="task-data d-flex align-items-center justify-content-center description text-danger"
        style="height: 80px"
      >
        {{ modalData.status }} {{ modalData.statusText }}
      </div>
      <div
        class="button-container d-flex align-items-center justify-content-end gap-3"
      >
        <button
          class="button modal-cancel rounded-1 px-3 py-1"
          (click)="dialogRef.close()"
        >
          close
        </button>
      </div>
    </div>
  `,
  styles: `
  .description {
    font-size: 18px;
    margin-bottom: 10px;
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
      background-color: var(--bs-danger);
      border: 1px solid var(--bs-danger-text-emphasis);
      color: var(--bs-white);
    }
  }`,
})
export class ErrorHandleComponent {
  @Input() modalData: any;

  constructor(public dialogRef: NgbActiveModal) {}
  ngOnInit() {
    console.log(this.modalData.status);
  }
}
