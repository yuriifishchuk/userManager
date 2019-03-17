import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close(this.addForm.value);
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

}
