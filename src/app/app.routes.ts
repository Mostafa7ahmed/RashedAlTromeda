import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';
import { Home } from './Pages/home/home';
import { MainOutlet } from './Layout/main-outlet/main-outlet';
import { Authoutlet } from './Layout/authoutlet/authoutlet';

export const routes: Routes = [
  {
    path: '',
    component: MainOutlet,
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
          import('./Pages/service/service').then(m => m.Service),
      },
      {
        path: 'workerprofile',
        loadComponent: () =>
          import('./Pages/worker-profile/worker-profile').then(m => m.WorkerProfile),
      }
    ]
  },
  {
  path: 'auth',
  component: Authoutlet, 
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
        path: 'register',
        loadComponent: () =>
          import('./Pages/Auth/sigin/sigin').then(m => m.Sigin),
      }
      ,
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
