import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../../task-list/task-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-task-list',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './user-task-list.component.html',
  styleUrl: './user-task-list.component.css',
})
export class UserTaskListComponent {
  taskList: any;
  activatedRoute = inject(ActivatedRoute)
  userId: any;

  constructor() {
    console.log("hello");
  }

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.activatedRoute.snapshot.params['userId']);
  }
}
