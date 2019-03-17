import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../classes/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick() {
    this.dialogRef.close();
  }

  edit() {
    this.dialogRef.close(this.editForm.value);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.data.firstName, Validators.required),
      lastName: new FormControl(this.data.lastName, Validators.required),
      email: new FormControl(this.data.email, Validators.email),
      password: new FormControl(this.data.password, [Validators.required, Validators.minLength(4)])
    });
  }

}
