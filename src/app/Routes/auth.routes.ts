import { Routes } from '@angular/router';
import { Authoutlet } from '../Layout/authoutlet/authoutlet';
import { isAuthGuard } from '../Core/guards/is-auth.guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: Authoutlet,
    canActivate: [isAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'selectType' },
      { path: 'selectType', loadComponent: () => import('../Pages/Auth/select-type/select-type').then(m => m.SelectType) },
      { path: 'login/:type', loadComponent: () => import('../Pages/Auth/login/login').then(m => m.Login) },
      { path: 'selectMap', loadComponent: () => import('../Pages/Auth/select-map/select-map').then(m => m.SelectMap) },
      { path: 'otp', loadComponent: () => import('../Pages/Auth/otp/otp').then(m => m.Otp) },
      { path: 'register/customer', loadComponent: () => import('../Pages/Auth/register-customer/register-customer').then(m => m.RegisterCustomer) },
      { path: 'register/engineer', loadComponent: () => import('../Pages/Auth/register-engineer/register-engineer').then(m => m.RegisterEngineer) },
      { path: 'register/organization', loadComponent: () => import('../Pages/Auth/register-organization/register-organization').then(m => m.RegisterOrganization) },
      { path: 'forgetpassword', loadComponent: () => import('../Pages/Auth/forgetpassword/forgetpassword').then(m => m.Forgetpassword) },
    ],
  },
];
