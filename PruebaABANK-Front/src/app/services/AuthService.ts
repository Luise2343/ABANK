import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, password: string) {
    this.http.post<any>(`${environment.authUrl}`, { usuario, password }).subscribe(
      response => {
        if (response && response.usuario) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/employee-list']);
        } else {
          console.error('Autenticación fallida:', response.error);
        }
      },
      error => {
        console.error('Error en la solicitud de autenticación:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}




