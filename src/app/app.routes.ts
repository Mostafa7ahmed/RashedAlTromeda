import { Routes } from '@angular/router';
import { customerRoutes } from './Routes/customer.routes';
import { engineerRoutes } from './Routes/enginer.routes';
import { authRoutes } from './Routes/auth.routes';
import { organizationRoutes } from './Routes/organization.routes';
export const routes: Routes = [
  ...customerRoutes,
  ...engineerRoutes,
  ...organizationRoutes,
  ...authRoutes,
  { path: '**', redirectTo: 'home' },
];
