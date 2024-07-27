import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../services/task.service';
import { EditDataService } from '../../services/edit-data.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-compoonent',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, AddTaskComponent, CommonModule],
  templateUrl: './task-compoonent.component.html',
  styleUrl: './task-compoonent.component.css',
  providers: [TaskService]
})
export class TaskCompoonentComponent implements OnInit {
  errmessage: string;
  taskList: any[] = [];
  taskService = inject(TaskService);
  editDataService = inject(EditDataService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  userId: any;
  filterList: any[] = [];
  authService = inject(AuthService);

  constructor() { }
  ngOnInit(): void {
    this.userId = this.activedRoute.snapshot.params['userId'];
    if (this.authService.isAdmin() == false) {
      this.taskService.getTasks().subscribe({
        next: (tasks: any[]) => {
          this.taskList = tasks['tasks'];
        },
        error: (error) => {
          this.errmessage = "Something Wend Wrong";
        },
      })
    } else {
      this.taskService.getUsersTasks(this.userId).subscribe({
        next: (tasks: any[]) => {
          this.taskList = tasks['tasks'];
        },
        error: (error) => {
          this.errmessage = "Something Wend Wrong";
        },
      })
    }
  }
}
