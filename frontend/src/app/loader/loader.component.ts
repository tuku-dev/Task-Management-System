import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader" *ngIf="isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        .spinner-border {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: 80px;
          height: 80px;
          --bs-spinner-border-width: 0.5rem;
          border-color: #4de1ff #4de1ff #4de1ff transparent;
        }
      }
    `,
  ],
})
export class LoaderComponent {
  @Input() isLoading: boolean = true;
}
