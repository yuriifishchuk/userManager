import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatProgressSpinnerModule, MatTooltipModule, MatSnackBarModule, MatPaginatorModule, MatInputModule, MatSortModule, MatDialogModule, MatButtonModule, MatCardModule, MatListModule, MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UserComponent } from './user/user.component';
import { UserInterceptor } from './services/user.interceptor';
import { LoaderService } from './services/loader.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotificationService } from './services/notification.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    UserComponent,
    SpinnerComponent
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
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    LoaderService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
