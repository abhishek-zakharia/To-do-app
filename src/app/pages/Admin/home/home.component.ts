import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { TaskService } from '../../../services/task.service';
import { TaskCompoonentComponent } from '../../task-compoonent/task-compoonent.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
