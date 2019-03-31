import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isUser(userList: User[], email: string, pass: string): boolean {
    for (const user of userList) {
      if (user.email === email && user.password === pass) {
        localStorage.setItem('isUser', 'true');
        localStorage.setItem('firstName', user.firstName);
        return true;
      }
    }
    localStorage.setItem('isUser', 'false');
    return false;
  }

  logout() {
    localStorage.setItem('isUser', 'false');
    localStorage.removeItem('firstName');
    this.router.navigate(['/']);
  }
}
