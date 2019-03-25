import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatSortModule, MatDialogModule, MatButtonModule, MatCardModule, MatListModule, MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EditDialogComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule
  ],
  entryComponents: [
    EditDialogComponent,
    AddDialogComponent
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
