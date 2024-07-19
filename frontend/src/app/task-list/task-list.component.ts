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
  apiUrl = environment.apiUrl + '/tasks';

  constructor(public modalService: NgbModal, private ts: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.taskList = [
      {
        _id: '66952f33fc13ae5f072345b2',
        title: 'Registered Nurse',
        description:
          'Reposition Left Temporomandibular Joint, External Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345b3',
        title: 'Design Engineer',
        description:
          'Occlusion of Right Anterior Tibial Artery with Extraluminal Device, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345b4',
        title: 'Account Executive',
        description:
          'Fluoroscopy of Lumbosacral Joint using Low Osmolar Contrast',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345b5',
        title: 'Account Representative I',
        description:
          'Drainage of Cystic Duct with Drainage Device, Percutaneous Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345b6',
        title: 'Marketing Manager',
        description:
          'Repair Left Common Iliac Artery, Percutaneous Endoscopic Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345b7',
        title: 'Recruiting Manager',
        description:
          'Dilation of Coronary Artery, Two Arteries with Four or More Drug-eluting Intraluminal Devices, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345b8',
        title: 'Professor',
        description:
          'Bypass Descending Colon to Cutaneous, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345b9',
        title: 'Engineer III',
        description:
          'Excision of Left Shoulder Bursa and Ligament, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345ba',
        title: 'Systems Administrator I',
        description: 'Repair Left Ovary, Open Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345bb',
        title: 'Analyst Programmer',
        description:
          'Occlusion of Right External Iliac Artery with Intraluminal Device, Percutaneous Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345bc',
        title: 'Help Desk Operator',
        description: 'Bypass Upper Esophagus to Duodenum, Open Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345bd',
        title: 'Account Representative III',
        description:
          'Removal of Synthetic Substitute from Lower Back, External Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345be',
        title: 'VP Product Management',
        description:
          'Removal of Autologous Tissue Substitute from Lumbar Vertebral Disc, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345bf',
        title: 'Assistant Manager',
        description:
          'Replacement of Left Hip Joint with Metal on Polyethylene Synthetic Substitute, Open Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345c0',
        title: 'Sales Associate',
        description:
          'Dilation of Face Artery, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345c1',
        title: 'Physical Therapy Assistant',
        description: 'Ultrasonography of Right Elbow, Densitometry',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345c2',
        title: 'Human Resources Manager',
        description:
          'Compression of Left Upper Arm using Intermittent Pressure Device',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345c3',
        title: 'Clinical Specialist',
        description:
          'Supplement Left Internal Mammary Artery with Autologous Tissue Substitute, Open Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345c4',
        title: 'Design Engineer',
        description:
          'Extirpation of Matter from Innominate Artery, Bifurcation, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345c5',
        title: 'VP Sales',
        description:
          'Division of Right Upper Leg Subcutaneous Tissue and Fascia, Percutaneous Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345c6',
        title: 'Dental Hygienist',
        description:
          'Replacement of Right Tarsal with Autologous Tissue Substitute, Open Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345c7',
        title: 'Recruiter',
        description:
          'Extirpation of Matter from Right Internal Carotid Artery, Percutaneous Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345c8',
        title: 'Chemical Engineer',
        description:
          'Removal of Synthetic Substitute from Vas Deferens, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345c9',
        title: 'Budget/Accounting Analyst IV',
        description:
          'Insertion of Endobronchial Valve into Left Upper Lobe Bronchus, Via Natural or Artificial Opening',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345ca',
        title: 'Speech Pathologist',
        description:
          'Select Picture Audiometry Assessment using Sound Field / Booth',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345cb',
        title: 'Tax Accountant',
        description:
          'Restriction of Right Cephalic Vein, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345cc',
        title: 'Analog Circuit Design manager',
        description:
          'Revision of Internal Fixation Device in Right Elbow Joint, Percutaneous Endoscopic Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345cd',
        title: 'Chemical Engineer',
        description:
          'Occlusion of Left Subclavian Artery with Extraluminal Device, Percutaneous Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345ce',
        title: 'Human Resources Manager',
        description:
          'Revision of Radioactive Element in Uterus and Cervix, Percutaneous Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345cf',
        title: 'Physical Therapy Assistant',
        description:
          'Replacement of Anal Sphincter with Autologous Tissue Substitute, Percutaneous Endoscopic Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345d0',
        title: 'Human Resources Assistant I',
        description:
          'Removal of Infusion Device from Cervical Vertebral Joint, Percutaneous Endoscopic Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345d1',
        title: 'Speech Pathologist',
        description:
          'Reposition Right Carpal with Internal Fixation Device, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d2',
        title: 'Biostatistician I',
        description:
          'Drainage of Portal Vein, Percutaneous Endoscopic Approach, Diagnostic',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345d3',
        title: 'Social Worker',
        description: 'Dressing Techniques Treatment using Other Equipment',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d4',
        title: 'Software Consultant',
        description:
          'Revision of Intraluminal Device in Hepatobiliary Duct, Via Natural or Artificial Opening',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d5',
        title: 'Administrative Officer',
        description: 'Reposition Cervix, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d6',
        title: 'Help Desk Operator',
        description:
          'Removal of Nonautologous Tissue Substitute from Left Knee Joint, Percutaneous Endoscopic Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d7',
        title: 'VP Sales',
        description:
          'Supplement Left Occipital Bone with Synthetic Substitute, Percutaneous Approach',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345d8',
        title: 'Software Engineer III',
        description:
          'Replacement of Left Toe Phalangeal Joint with Nonautologous Tissue Substitute, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345d9',
        title: 'Registered Nurse',
        description:
          'Excision of Right Finger Phalangeal Joint, Percutaneous Approach, Diagnostic',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345da',
        title: 'Assistant Media Planner',
        description: 'Bypass Hepatic Vein to Lower Vein, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345db',
        title: 'Nuclear Power Engineer',
        description:
          'Drainage of Facial Muscle with Drainage Device, Open Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345dc',
        title: 'Sales Representative',
        description:
          'Beam Radiation of Duodenum using Heavy Particles (Protons,Ions)',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345dd',
        title: 'Help Desk Operator',
        description: 'Mouth and Throat, Removal',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345de',
        title: 'Assistant Professor',
        description:
          'Plain Radiography of Bilateral Salivary Glands using Other Contrast',
        status: 'In Progress',
      },
      {
        _id: '66952f33fc13ae5f072345df',
        title: 'Accountant III',
        description:
          'Replacement of Right Lacrimal Duct with Nonautologous Tissue Substitute, Via Natural or Artificial Opening',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345e0',
        title: 'Environmental Tech',
        description:
          'Drainage of Right Colic Artery with Drainage Device, Percutaneous Endoscopic Approach',
        status: 'To Do',
      },
      {
        _id: '66952f33fc13ae5f072345e1',
        title: 'GIS Technical Architect',
        description: 'Release Hypothalamus, Percutaneous Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345e2',
        title: 'Assistant Manager',
        description: 'Drainage of Left Rib with Drainage Device, Open Approach',
        status: 'Done',
      },
      {
        _id: '66952f33fc13ae5f072345e3',
        title: 'Health Coach I',
        description: 'Resection of Left Kidney, Open Approach',
        status: 'To Do',
      },
    ];
    this.sortTasks();
  }

  getTasks() {
    this.ts.getMethod('/tasks/getAll').subscribe((res) => {
      console.log(res);
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

  addTask() {
    let modalRef = this.modalService.open(AddTaskComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = {
      title: 'Add Task',
      buttonText: 'Add',
    };
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      () => {}
    );
  }

  updateTask(task: any) {
    let modalRef = this.modalService.open(AddTaskComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalData = {
      title: 'Update Task',
      buttonText: 'Update',
      task,
    };
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      () => {}
    );
  }
  deleteTask(index: number) {}
}
