import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: User[] = [];
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/users']);
    this.loginForm = new FormGroup({
      email: new FormControl('admin@gmail.com', Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')),
      password: new FormControl('admin', Validators.minLength(4))
    });

    this.userService.getUsers().subscribe((data: User[]) => this.users = data);
  }

  submit() {
    this.authService.checkUser(this.users, this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    this.router.navigate(['/users']);
  }


}
