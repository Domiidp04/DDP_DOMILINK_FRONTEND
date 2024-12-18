import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public errorMessage: WritableSignal<string> = signal('');
  public formRegister: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formRegister = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ])
    });
  }

  public register(): void {
    this.authService.register(this.formRegister.get('username').value, this.formRegister.get('password').value)
      .then(() => this.router.navigate(['/login']))
      .catch((error) => {
        if (error.status === 401) {
          this.errorMessage.set('Username or password is incorrect.');
        } else {
          this.errorMessage.set('An unexpected error occurred.');
        }
        this.formRegister.reset();
      })
  }

}
