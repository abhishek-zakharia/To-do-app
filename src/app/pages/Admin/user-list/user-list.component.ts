import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DatePipe, MatButton, RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent {

  // @Input() userList: any[] | null = [];
  userList: any[];
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        this.userList = users['users'];
      }, error(err) {
        console.log(err);
      },
    })
  }
}

