import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AjouterComponent } from './ajouter/ajouter.component';
import { HomepageComponent } from './hom/homepage/homepage.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './services/auth.guard';
export const routes: Routes = [ {
    path: '',
    component: LoginComponent,
    title: 'Home page',
  },
  {
    path: 'sign',
    component: SignupComponent,
    title: 'SignUp',
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    title: 'SignUp',
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    title: 'SignUp',
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AjouterComponent,
    title: 'SignUp',
    canActivate: [AuthGuard],
  },
  {
    path: 'log',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
    component: HomepageComponent,
    title: 'Login',
    canActivate: [AuthGuard],
  },
]
