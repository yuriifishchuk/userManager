import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { AuthService } from '../services/auth.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserService]
})
export class AdminComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  userName: string;
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'password', 'action'];

  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userName = localStorage.getItem('firstName');
    this.userService.getUsers().subscribe((data: User[]) => this.users = data);
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: user
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.email = res.email;
        user.password = res.password;
        this.userService.editUser(user).subscribe();
      }
    });
  }

  deleteUser(user: User, index) {
    this.users.splice(index, 1);
    this.userService.deleteUser(user.id).subscribe();
    this.table.renderRows();
  }

  addUser() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const newUser: User = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          password: res.password
        };
        this.users.push(newUser);
        this.userService.createUser(newUser).subscribe();
        this.table.renderRows();
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
