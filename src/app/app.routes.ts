import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TaskCompoonentComponent } from './pages/task-compoonent/task-compoonent.component';
import { LoginComponent } from './pages/login/login.component';
import { UserListComponent } from './pages/Admin/user-list/user-list.component';
import { adminGuard, authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/Admin/home/home.component';
import { UserTaskListComponent } from './pages/Admin/user-task-list/user-task-list.component';
// import { UserTaskListComponent } from './pages/Admin/user-task-list/user-task-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', title: 'Login' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'tasks',
    component: TaskCompoonentComponent,
    title: "tasks",
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegistrationComponent,
    title: "Register"
  },
  {
    path: 'users',
    component: UserListComponent,
    title: "Users",
    canActivate: [adminGuard],
  },
  {
    path: 'usersTask/:userId',
    component: TaskCompoonentComponent,
    title: "Users",
    canActivate: [adminGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Home",
  },
  {
    path: 'userTask/:userId',
    component: UserTaskListComponent,
    title: "User's Task",
    canActivate: [adminGuard]
  },
  { path: '**', component: PageNotFoundComponent, title: '404 | Page Not Found' }
];