import { Component, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public username: WritableSignal<string> = signal('');

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username.set(localStorage.getItem('username'));
  }

  public logout(): void{
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
