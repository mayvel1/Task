import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full'},
  { path: 'signup', component: SignUpComponent ,canActivate:[NotAuthenticatedGuard]},
  { path: 'signin', component: SignInComponent,canActivate:[NotAuthenticatedGuard] },
  { path: 'user-profile', component:UserProfileComponent ,canActivate:[AuthGuard]},
  { path: 'tasks', component:TasksComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
