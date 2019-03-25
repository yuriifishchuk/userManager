import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
// tslint:disable-next-line:max-line-length
import { MatTableModule, MatButtonModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule, MatDialogModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [MatTableModule, MatButtonModule, MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatListModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatSortModule,
        HttpClientModule],
        providers: [UserService, AuthService, AuthGuard, Router]
    })
    .compileComponents();
    TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
