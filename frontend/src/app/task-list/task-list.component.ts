import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskList = [{ _id: '', title: '', description: '', status: '' }];
  sortedList = [{ _id: '', title: '', description: '', status: '' }];
  loader = true;
  prevAction = '';
  openAction: string | null = null;
  clicked = 0;
  taskSort = 'all';
  totalCount = 0;
  url = environment.apiUrl;

  constructor(public modalService: NgbModal, private ts: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.ts.postMethod(this.url + 'tasks/getAll', {}).subscribe((response) => {
      if (response.success) {
        this.taskList = response.tasks;
        this.totalCount = response.totalCount;
        this.sortTasks();
      }
    });
  }

  toggleActions(taskId: string) {
    this.openAction = taskId;
    if (this.prevAction === taskId) {
      this.clicked = 0;
      this.prevAction = '';
    } else {
      this.clicked = 1;
      this.prevAction = taskId;
    }
  }

  sortTasks() {
    let sortFilter = '';
    switch (this.taskSort) {
      case 'todo':
        sortFilter = 'To Do';
        break;
      case 'progress':
        sortFilter = 'In Progress';
        break;
      case 'done':
        sortFilter = 'Done';
        break;
      default:
        sortFilter = 'all';
        break;
    }

    this.sortedList = this.taskList.filter((task) => {
      if (sortFilter === 'all') {
        return true;
      } else {
        return task.status === sortFilter;
      }
    });
  }

  addEditTask(type: string, task?: any | {}) {
    let modalRef = this.modalService.open(AddTaskComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = {
      title: type + ' Task',
      buttonText: type,
      task,
    };
    modalRef.result.then(
      (result) => {
        if (result.success) {
          this.getTasks();
        }
      },
      () => {}
    );
  }

  deleteTask(index: number) {}
}
