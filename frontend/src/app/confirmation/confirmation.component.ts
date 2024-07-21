import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  template: `
    <div class="task-form-container p-3">
      <h4 class="modal-title px-2 text-danger">
        Delete "{{ modalData.title }}" !
      </h4>
      <hr class="hr my-2" />
      <div
        class="task-data d-flex align-items-center justify-content-center description"
        style="height: 80px"
      >
        Do you really want to delete this task ?
      </div>
      <div
        class="button-container d-flex align-items-center justify-content-end gap-3"
      >
        <button
          class="button modal-edit rounded-1 px-3 py-1"
          (click)="dialogRef.close({ success: true })"
        >
          Yes
        </button>
        <button
          class="button modal-cancel rounded-1 px-3 py-1"
          (click)="dialogRef.close({ success: false })"
        >
          No
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
export class ConfirmationComponent {
  @Input() modalData: any;

  constructor(public dialogRef: NgbActiveModal) {}
}
