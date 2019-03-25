import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public loggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  checkUser(userList: User[], email: string, pass: string) {
    for (const user of userList) {
        this.loggedIn = (user.email === email && user.password === pass) ? true : false;
        if (this.loggedIn) {
          localStorage.setItem('isUser', 'true');
          localStorage.setItem('firstName', user.firstName);
          return false;
        }
    }
    localStorage.setItem('isUser', 'false');
    return true;
  }

  logout() {
    localStorage.setItem('isUser', 'false');
    this.loggedIn = false;
    localStorage.removeItem('firstName');
    this.router.navigate(['/']);
  }

}
