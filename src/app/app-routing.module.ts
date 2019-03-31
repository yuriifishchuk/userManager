import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'users', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
