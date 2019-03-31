import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  edit() {
    this.dialogRef.close(this.editForm.value);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      firstName: new FormControl(
        this.data.user ? this.data.user.firstName : '',
        [Validators.required, Validators.pattern('[A-Z]{1}[a-z]{1,32}')]
      ),
      lastName: new FormControl(this.data.user ? this.data.user.lastName : '', [
        Validators.required,
        Validators.pattern('[A-Z]{1}[a-z]{1,32}')
      ]),
      email: new FormControl(
        this.data.user ? this.data.user.email : '',
        Validators.email
      ),
      password: new FormControl(this.data.user ? this.data.user.password : '', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
}
