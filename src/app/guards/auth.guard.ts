import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const isLogged = this.checkLogin();
        return isLogged;
    }

    checkLogin(): boolean {
        const isloggedIn = localStorage.getItem('isUser');
        if (isloggedIn === 'true') { return true; }
        console.log(isloggedIn);
        this.router.navigate(['/']);
        return false;
    }

    canLoad() {
        return this.canActivate();
      }
}
