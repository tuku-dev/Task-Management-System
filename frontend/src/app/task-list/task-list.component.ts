import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TaskService } from '../task.service';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { StatusPipe } from './status.pipe';
import { TruncatePipe } from './truncate.pipe';

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
  url = environment.apiUrl;
  openAction: string | null = null;
  prevAction = '';
  clicked = 0;
  hoverClass = '';
  taskId = '';
  status = '';
  taskTitle = '';
  filter: any = {};
  // pagination
  totalCount = 0;
  pager = 0;
  page = 1;
  pageSize = 10;

  constructor(public modalService: NgbModal, private ts: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    if (this.status) {
      this.filter.status = this.status;
    } else {
      this.filter.status = '';
    }
    this.filter.page = this.page;
    this.filter.perPage = this.pageSize;

    this.ts.postMethod(this.url + 'tasks/getAll', this.filter).subscribe(
      (response) => {
        if (response.success) {
          this.taskList = response.tasks;
          this.totalCount = response.totalCount;
          this.pager = Math.ceil(this.totalCount / this.pageSize);
        }
      },
      (error) => {
        this.ts.handleError(error);
      }
    );
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

  deleteTask(task: any, index: number) {
    let modalRef = this.modalService.open(ConfirmationComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = task;
    modalRef.result.then(
      (result) => {
        if (result.success) {
          console.log(result);
          this.ts
            .postMethod(this.url + 'tasks/delete', { _id: task._id })
            .subscribe((response) => {
              if (response.success) {
                this.getTasks();
              }
            });
        }
      },
      () => {}
    );
  }
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

  fetchPage(type: any) {
    if (type === 'first') {
      this.page = 1;
    } else if (type === 'last') {
      this.page = this.pager;
    } else if (type === 'prev' && this.page > 1) {
      this.page--;
    } else if (type === 'next' && this.page < this.pager) {
      this.page++;
    }

    this.getTasks();
  }
}
