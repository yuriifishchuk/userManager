import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AuthService } from '../services/auth.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userName: string;
  users: User[] = [];
  dataSource;
  displayedColumns: string[] = ['id', 'fullName', 'action'];

  constructor(
    private notService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.refresh();
    this.userName = localStorage.getItem('firstName');
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {
        msg: `Edit User with ID: ${user.id}`,
        action: 'Edit',
        user
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.email = res.email;
        user.password = res.password;
        this.userService.editUser(user).subscribe(() => this.refresh());
        this.notService.openSnackBar('User successfully updated!', 'Ok');
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: `Are you sure to delete the user with ID: ${user.id}?`
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(user.id).subscribe(() => this.refresh());
        this.notService.openSnackBar('User successfully deleted!', 'Ok');
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {
        msg: 'Add new user',
        action: 'Add'
      }
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
        this.userService.createUser(newUser).subscribe(() => this.refresh());
        this.notService.openSnackBar('User successfully created!', 'Ok');
      }
    });
  }

  refresh() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  logout() {
    this.authService.logout();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewUser(user) {
    this.router.navigate([`/users/${user.id}`]);
  }
}
