import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public formLogin: FormGroup;
  public errorMessage: WritableSignal<string> = signal('');

  constructor(private authService: AuthService, private router: Router){ }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formLogin = new FormGroup({
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

  public login(): void {
    this.authService.login(this.formLogin.get('username').value, this.formLogin.get('password').value)
      .then(() => this.router.navigate(['/']))
      .catch(error => {

        if (error.status === 401) {
          this.errorMessage.set('Username or password is incorrect.') ;
        } else {
          this.errorMessage.set('An unexpected error occurred.') ;
        }

        this.formLogin.reset(); // Opcional: Resetear el formulario
      });
  }


}
