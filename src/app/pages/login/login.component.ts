import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {  
  
  loginForm: FormGroup;
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  loginMsg: string;

  constructor() {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('loginUser')) {
        this.router.navigate(['/tasks']);
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])
    });
  }

  onLogin() {
    this.userService.login(this.loginForm['value']).subscribe((userData) => {
      console.log(this.authService.setLogin(userData));
      
      if (this.authService.setLogin(userData) == true) {
        
        Swal.fire({
          title: "Login Successfully!",
          icon: "success"
        });
        if (userData.user['role_id'] == 1) {
          this.router.navigate(['tasks']);
        } else {
          this.router.navigate(['users']);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  }
}
