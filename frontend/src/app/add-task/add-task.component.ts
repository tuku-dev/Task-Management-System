import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  @Input() modalData: any;
  addTaskForm: FormGroup | any;
  submitted = false;
  taskData: any;
  url = environment.apiUrl;

  constructor(
    public fb: FormBuilder,
    public dialogRef: NgbActiveModal,
    private ts: TaskService
  ) {}

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['todo'],
      description: [''],
    });
    if (this.modalData.task && this.modalData.task._id) {
      this.taskData = this.modalData.task;
      this.fillData();
    }
  }
  get f() {
    return this.addTaskForm.controls;
  }

  fillData() {
    this.addTaskForm = this.fb.group({
      title: [this.taskData.title],
      status: [this.taskData.status],
      description: [this.taskData.description],
    });
  }

  cancelForm() {
    this.dialogRef.close({ success: false });
  }
  submitForm() {
    this.submitted = true;
    if (this.addTaskForm.invalid) return;

    if (this.taskData && this.taskData._id) {
      const data = {
        _id: this.taskData._id,
        title: this.addTaskForm.value.title,
        status: this.addTaskForm.value.status,
        description: this.addTaskForm.value.description,
      };
      console.log(data);

      this.ts.postMethod(this.url + 'tasks/update', data).subscribe(
        (response) => {
          if (response.success) {
            this.dialogRef.close({ success: true });
          }
        },
        (error) => {
          this.ts.handleError(error);
        }
      );
    } else {
      const data = {
        title: this.addTaskForm.value.title,
        status: this.addTaskForm.value.status,
        description: this.addTaskForm.value.description,
      };
      this.ts.postMethod(this.url + 'tasks/create', data).subscribe(
        (response) => {
          if (response.success) {
            this.dialogRef.close({ success: true });
          }
        },
        (error) => {
          this.ts.handleError(error);
        }
      );
    }
  }
}
