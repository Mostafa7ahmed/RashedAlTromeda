import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';
import { MainOutlet } from './Layout/main-outlet/main-outlet';
import { Authoutlet } from './Layout/authoutlet/authoutlet';
import { Home } from './Pages/Customer/home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainOutlet,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'service',
        loadComponent: () =>
          import('./Pages/Customer/service/service').then(m => m.Service),
      },
      {
        path: 'workerprofile',
        loadComponent: () =>
          import('./Pages/Customer/worker-profile/worker-profile').then(m => m.WorkerProfile),
      },
      { 
        path: 'myporfile',
        loadComponent: () =>
          import('./Pages/Customer/myporfile/myporfile').then(m => m.Myporfile),
      },
      
    ]
  },
  {
    path: 'auth',
    component: Authoutlet,
    canActivate: [isAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./Pages/Auth/login/login').then(m => m.Login),
      },
      {
        path: 'selectMap',
        loadComponent: () =>
          import('./Pages/Auth/select-map/select-map').then(m => m.SelectMap),
      },
      {
        path: 'otp',
        loadComponent: () =>
          import('./Pages/Auth/otp/otp').then(m => m.Otp),
      }
      , {
        path: 'register',
        loadComponent: () =>
          import('./Pages/Auth/sigin/sigin').then(m => m.Sigin),
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./Pages/Auth/forgetpassword/forgetpassword').then(m => m.Forgetpassword),
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
