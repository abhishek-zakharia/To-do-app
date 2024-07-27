import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { EditDataService } from '../../services/edit-data.service';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TaskCompoonentComponent } from '../task-compoonent/task-compoonent.component';
import { UserListComponent } from '../Admin/user-list/user-list.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, DatePipe, MatButton],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  providers: [DatePipe]
})

export class AddTaskComponent {

  taskService = inject(TaskService);
  editDataService = inject(EditDataService);
  taskForm: FormGroup;
  editMode: boolean = false;
  id: any;
  btnValue: string = "Add Task";
  message: string;
  activedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  // taskList = inject(TaskCompoonentComponent);
  userList: any[];
  userService = inject(UserService);

  constructor(public datePipe: DatePipe) {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        this.userList = users['users'];
      }, error(err) {
        console.log(err);
      },
    })

    if (this.authService.isAdmin()) {
      // this.editMode = true;
      // this.btnValue = "Update Task";
    }
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskName: new FormControl(null, Validators.required),
      taskDescription: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      isCompleted: new FormControl(),
      user: new FormControl(),
      id: new FormControl()
    });

    this.editDataService.dataEmitter.subscribe((data) => {
      this.editMode = data.editMode;
      this.btnValue = "Update Task";
      this.taskService.editTask(data.id).subscribe({
        next: (task: any) => {
          this.taskForm.patchValue({
            "taskName": task.task[0].taskName,
            "taskDescription": task.task[0].taskDescription,
            "dueDate": this.datePipe.transform(task.task[0].dueDate, 'yyyy-MM-dd'),
            "id": task.task[0].id
          })
        }
      })
    })
  }

  onSubmit() {
    if (this.editMode == false) {
      console.log(this.taskForm.value);
      
      this.taskService.addTask(this.taskForm).subscribe({
        next: () => {
          Swal.fire({
            title: "Task Added!",
            icon: "success"
          });
          // this.taskList.ngOnInit();
        }, error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
    } else {
      this.taskService.updateTask(this.taskForm).subscribe({
        next: () => {
          Swal.fire({
            title: "Task Updated!",
            icon: "success"
          });
          // this.taskList.ngOnInit();
        }, error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
    }
  }
}

