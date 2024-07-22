import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TaskService } from '../task.service';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { StatusPipe } from './status.pipe';
import { TruncatePipe } from './truncate.pipe';

import $ from 'jquery';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TruncatePipe,
    StatusPipe,
    LoaderComponent,
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, AfterViewInit {
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
  isLoading: boolean = true;
  // pagination
  totalCount = 0;
  pager = 0;
  page = 1;
  pageSize = 10;

  constructor(
    public modalService: NgbModal,
    public ts: TaskService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $(document).on('click', function (e) {
          $('.action-buttons').addClass('d-none');
          if ($(e.target).closest('.actions-list').length > 0) {
            let target = $(e.target).closest('.actions-list');
            target.next('.action-buttons').removeClass('d-none');
          }
        });
      }, 2000);
    }
  }

  getTasks() {
    this.isLoading = true;
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
          this.isLoading = false;
        }
      },
      (error) => {
        this.ts.handleError(error);
        this.isLoading = false;
      }
    );
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
        this.isLoading = true;
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
        this.isLoading = true;
        if (result.success) {
          console.log(result);
          this.ts
            .postMethod(this.url + 'tasks/delete', { _id: task._id })
            .subscribe((response) => {
              if (response.success) {
                this.getTasks();
                this.isLoading = false;
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
