import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../task.service';
import { StatusPipe } from './status.pipe';
import { TruncatePipe } from './truncate.pipe';
import { ViewTaskComponent } from '../view-task/view-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TruncatePipe,
    StatusPipe,
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskList: any = [];
  sortedList = [{ _id: '', title: '', description: '', status: '' }];
  loader = true;
  taskSort: any = '';
  totalCount = 0;
  url = environment.apiUrl;
  page = 1;
  pageSize = 10;
  openAction: string | null = null;
  prevAction = '';
  clicked = 0;
  hoverClass = '';
  taskId = '';
  status = '';
  taskTitle = '';
  filter: any = {};
  taskStatus = {
    todo: 'To Do',
    progress: 'In Progress',
    done: 'Done',
  };

  constructor(public modalService: NgbModal, private ts: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    if (this.status) {
      this.filter.status = this.status;
    }
    this.ts
      .postMethod(this.url + 'tasks/getAll', this.filter)
      .subscribe((response) => {
        if (response.success) {
          console.log(response);

          this.taskList = response.tasks;
          this.totalCount = response.totalCount;
        }
      });
  }

  toggleAction(taskId: string) {
    this.openAction = taskId;
    if (this.prevAction === taskId) {
      this.clicked = 0;
      this.prevAction = '';
    } else {
      this.clicked = 1;
      this.prevAction = taskId;
    }
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
  viewTask(task: any) {
    let modalRef = this.modalService.open(ViewTaskComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = task;
    modalRef.result.then(
      (result) => {
        if (result.success) {
          this.addEditTask('Update', task);
        }
      },
      () => {}
    );
  }
}
