import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: string): any {
    if (value === 'todo') return 'To Do';
    if (value === 'progress') return 'In Progress';
    if (value === 'done') return 'Done';
  }
}
