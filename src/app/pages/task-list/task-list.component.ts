import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { EditDataService } from '../../services/edit-data.service';
import { SearchComponent } from '../search/search.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, HttpClientModule, MatButtonModule, SearchComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers: [TaskService],
  preserveWhitespaces: true
})
export class TaskListComponent {

  searchText: string = '';
  @Input() taskList: any[] | null = [];
  filterTaskList: any[];
  taskService = inject(TaskService);
  editMode: boolean = false;
  errmessage: string;

  constructor(private editDataService: EditDataService) {
  }

  ngOnInit(): void {
  }

  onEdit(data: any) {
    data.editMode = true;
    this.editDataService.raiseDataEmitterEvent(data);
  }

  onDelete(taskId) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        Swal.fire({
          title: "Task Deleted!",
          icon: "success"
        });
      }, error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  }

  ngOnChanges(): void {
    this.filterTaskList = this.taskList;
  }

  onSearchTask(searchValue: string) {
    this.filterTaskList = this.taskList.filter(task => task.taskName.toLowerCase().includes(searchValue.toLowerCase()) || task.taskDescription.toLowerCase().
      includes(searchValue.toLowerCase()) || task.dueDate.toLowerCase().
        includes(searchValue.toLowerCase()));
  }
}
