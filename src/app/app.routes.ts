import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';
import { MainOutlet } from './Layout/main-outlet/main-outlet';
import { Authoutlet } from './Layout/authoutlet/authoutlet';
import { Home } from './Pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainOutlet,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'category',
        loadComponent: () => import('./Pages/Customer/categories/categories').then((m) => m.Categories),
      },
        {
        path: 'service/:categoryId',
        loadComponent: () => import('./Pages/Customer/service/service').then((m) => m.Service),
      },
      {
        path: 'about',
        loadComponent: () => import('./Pages/about/about').then((m) => m.About),
      },
      {
        path: 'contact',
        loadComponent: () => import('./Pages/contactus/contactus').then((m) => m.Contactus),
      },
      {
                path: 'chooseworker/:serviceId',
        loadComponent: () =>
          import('./Pages/Customer/choose-engineer/choose-engineer').then((m) => m.ChooseEngineer),
      },
      {
        path: 'profile/:profileId',
        loadComponent: () =>
          import('./Pages/Customer/worker-profile/worker-profile').then((m) => m.WorkerProfile),
      },
      {
        path: 'myporfile',
        loadComponent: () =>
          import('./Pages/Customer/myporfile/myporfile').then((m) => m.Myporfile),
        children: [
          {
            path: '',
            redirectTo: 'personal-info',
            pathMatch: 'full',
          },
          {
            path: 'personal-info',
            loadComponent: () =>
              import('./Pages/Customer/myporfile/components/personal-info/personal-info').then(
                (m) => m.PersonalInfo
              ),
          },
          {
            path: 'suggestions',
            loadComponent: () =>
              import('./Pages/Customer/myporfile/components/suggestion/suggestion').then(
                (m) => m.Suggestion
              ),
          },
          {
            path: 'complaints',
            loadComponent: () =>
              import('./Pages/Customer/myporfile/components/complaints/complaints').then(
                (m) => m.Complaints
              ),
          },
          {
            path: 'bookings',
            loadComponent: () =>
              import('./Pages/Customer/myporfile/components/bookings/bookings').then(
                (m) => m.Bookings
              ),
          },
          {
            path: 'location',
            loadComponent: () =>
              import('./Pages/Customer/myporfile/components/location/location').then(
                (m) => m.Location
              ),
          },
            {
            path: 'change-password',
            loadComponent: () =>
              import('./Pages/Customer/changepassword/changepassword').then(
                (m) => m.Changepassword
              ),
          },
        ],
      },
      {
        path: 'addsuggest',
        loadComponent: () =>
          import(
            './Pages/Customer/myporfile/components/suggestion/components/addsuggest/addsuggest'
          ).then((m) => m.Addsuggest),
        outlet: 'popup',
      },
      {
        path: 'addcomplaint',
        loadComponent: () =>
          import(
            './Pages/Customer/myporfile/components/complaints/components/add-complaint/add-complaint'
          ).then((m) => m.AddComplaint),
        outlet: 'popup',
      },
      {
        path: 'myporfile/changepassword',
        loadComponent: () =>
          import('./Pages/Customer/changepassword/changepassword').then((m) => m.Changepassword),
      },
      {
        path: 'myporfile/infomation',
        loadComponent: () =>
          import('./Pages/Customer/infomation/infomation').then((m) => m.Infomation),
      },
    ],
  },
  {
    path: 'auth',
    component: Authoutlet,
    canActivate: [isAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'selectType',
      },
      {
        path: 'selectType',
        loadComponent: () => import('./Pages/Auth/select-type/select-type').then((m) => m.SelectType),
      },
      {
        path: 'login/:type',
        loadComponent: () => import('./Pages/Auth/login/login').then((m) => m.Login),
      },
      {
        path: 'selectMap',
        loadComponent: () => import('./Pages/Auth/select-map/select-map').then((m) => m.SelectMap),
      },
      {
        path: 'otp',
        loadComponent: () => import('./Pages/Auth/otp/otp').then((m) => m.Otp),
      },
      {
        path: 'register/customer',
        loadComponent: () => import('./Pages/Auth/register-customer/register-customer').then((m) => m.RegisterCustomer),
      },
      {
        path: 'register/engineer',
        loadComponent: () => import('./Pages/Auth/register-engineer/register-engineer').then((m) => m.RegisterEngineer),
      },
      {
        path: 'register/organization',
        loadComponent: () => import('./Pages/Auth/register-organization/register-organization').then((m) => m.RegisterOrganization),
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./Pages/Auth/forgetpassword/forgetpassword').then((m) => m.Forgetpassword),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
