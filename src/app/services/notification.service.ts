import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      duration: 2000
    });
  }

}
