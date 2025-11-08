import { Routes } from '@angular/router';
import { MainLayoutEngineer } from '../Layout/Engineer/main-layout-engineer/main-layout-engineer';
import { roleGuard } from '../Core/guards/role.guard';
import { Home } from '../Pages/home/home';
import { MainlayoutCenter } from '../Layout/Center/mainlayout-center/mainlayout-center';
import { HomeCustomer } from '../Pages/homeCustomer/home';

export const ceneterRoutes: Routes = [
  {
    path: 'suborganization',
    component: MainlayoutCenter,
    canActivate: [roleGuard(['suborganization'])],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeCustomer },
      {
        path: 'organizations',
        loadComponent: () => import('../Pages/Centers/organizations/organizations').then(m => m.Organizations),
      },
      {
        path: 'center/:id',
        loadComponent: () => import('../Pages/Centers/centers/centers').then(m => m.Centers),
      },
      {
        path: 'centerDetails/:id',
        loadComponent: () => import('../Pages/Centers/center-details/center-details').then(m => m.CenterDetails),
      },
      {
        path: 'myporfile',
        loadComponent: () => import('../Pages/Centers/myprofilecenter/myprofileCenter').then(m => m.MyprofileCenter),
        children: [
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
          {
            path: 'personal-info',
            loadComponent: () => import('../Pages/Centers/myprofilecenter/components/personal-info/personal-info').then(m => m.PersonalInfo),
          },
          {
            path: 'addProduct',
            loadComponent: () => import('../Pages/Centers/myprofilecenter/components/add-product/add-product').then(m => m.AddProduct),
          },
      
            {
            path: 'addService',
            loadComponent: () => import('../Pages/Centers/myprofilecenter/components/add-service/add-service').then(m => m.AddService),
          },
      
          {
            path: 'change-password',
            loadComponent: () => import('../Pages/Customer/changepassword/changepassword').then(m => m.Changepassword),
          },
        ],
      },
      {
        path: 'about',
        loadComponent: () => import('../Pages/about/about').then(m => m.About),
      },
      {
        path: 'contact',
        loadComponent: () => import('../Pages/contactus/contactus').then(m => m.Contactus),
      },
    ],
  },
];
