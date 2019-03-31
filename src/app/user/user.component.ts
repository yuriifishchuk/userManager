import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private id: number;
  user: User;
  private subscription: Subscription;
  constructor(
    private notService: NotificationService,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(
      params => (this.id = params.id)
    );
    this.userService.getUser(this.id).subscribe(data => (this.user = data));
  }

  goBack() {
    this.router.navigate(['/users']);
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
        this.userService.editUser(user).subscribe();
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
        this.userService.deleteUser(user.id).subscribe();
        this.notService.openSnackBar('User successfully deleted!', 'Ok');
        this.goBack();
      }
    });
  }

}
