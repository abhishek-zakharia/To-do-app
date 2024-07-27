import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {

  registerForm: FormGroup;
  userService = inject(UserService);
  validationMessage: string;
  message: string;

  constructor(private router: Router) {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('loginUser')) {
        router.navigate(['/tasks']);
      }
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl('male'),
      passwords: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
        cpassword: new FormControl(null, [Validators.required]),
      }, { validators: this.matchPassword })
    });
  }

  public matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cpassword')?.value;

    return password === confirmPassword ? null : { passwordMatch: true };
  }

  onRegister() {
    if (!this.registerForm.invalid) {
      this.userService.createUser(this.registerForm['value']).subscribe({
        next: (resp) => {
          Swal.fire({
            title: "Register Successfully!",
            icon: "success"
          });
        }, error: (err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
    } else {
      this.validationMessage = "Please Enter correct Information";
    }
  }
}
