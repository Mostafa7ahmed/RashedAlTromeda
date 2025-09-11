import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';
import { Home } from './Pages/home/home';

export const routes: Routes = [

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
        loadComponent: () => import('./Pages/service/service').then(m => m.Service),
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/Auth/login/login').then(m => m.Login),
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
