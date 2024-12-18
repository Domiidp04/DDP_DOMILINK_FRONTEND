import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public apiUrl: string = 'http://localhost:8080/auth';

  public login(username: string, password: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, { username, password }, { observe: 'response' })
        .pipe(
          tap(res => {
            // Obtén los encabezados
            const token = res.headers.get('Authorization') || '';
            const user = res.headers.get('username') || '';
            const id = res.headers.get('id') || '';

            // Guarda los encabezados en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', user);
            localStorage.setItem('id', id);
          })
        )
    ).catch(error => { throw error });
  }

  public register(username: string, password: string): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}/register`, { username, password }))
  }

  public logout(): void {
    localStorage.clear();
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null || localStorage.getItem('token') !== '';
  }


}
