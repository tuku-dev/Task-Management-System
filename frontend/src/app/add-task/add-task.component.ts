import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  @Input() modalData: any;
  addTaskForm: FormGroup | any;
  submitted = false;
  taskData: any;

  constructor(public fb: FormBuilder, public dialogRef: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.modalData);
    this.addTaskForm = this.fb.group({
      title: [''],
      status: ['To Do'],
      description: [''],
    });
    if (this.modalData.task && this.modalData.task._id) {
      this.taskData = this.modalData.task;
      this.fillData();
    }
  }

  fillData() {
    this.addTaskForm = this.fb.group({
      title: [this.taskData.title],
      status: [this.taskData.status],
      description: [this.taskData.description],
    });
  }

  cancelForm() {
    this.dialogRef.close({ success: true });
  }
  submitForm() {
    this.submitted = true;
    if (this.addTaskForm.invalid) return;

    const data = {
      title: this.addTaskForm.value.title,
      status: this.addTaskForm.value.status,
      description: this.addTaskForm.value.description,
    };
  }
}
