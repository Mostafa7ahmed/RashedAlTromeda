import { Routes } from '@angular/router';
import { customerRoutes } from './Routes/customer.routes';
import { engineerRoutes } from './Routes/enginer.routes';
import { authRoutes } from './Routes/auth.routes';


export const routes: Routes = [
  ...customerRoutes,
  ...engineerRoutes,
  ...authRoutes,
  { path: '**', redirectTo: 'home' },
];
