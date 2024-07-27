import { Component, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  preserveWhitespaces: true,
  // providers: [TaskService]
})

export class AppComponent {
  title = 'to-do-app';

  // taskList: any[] = [];

  // taskService = inject(TaskService);
  // editDataService = inject(EditDataService);
  // constructor() { }

  // ngOnInit(): void {
  //   this.taskService.getTasks().subscribe({
  //     next: (tasks: any[]) => {
  //       this.taskList = tasks['tasks'];
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   })
  // }
}
