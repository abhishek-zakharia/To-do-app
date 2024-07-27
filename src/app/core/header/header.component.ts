import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  isLoggedIn: boolean;
  authService = inject(AuthService);
  userService = inject(UserService);
  router: Router;
  message: string;
  constructor() {
  }

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout().subscribe({
      next: (resp) => {
        this.authService.logOut();
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