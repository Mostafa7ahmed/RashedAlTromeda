import { AddCenterAccount } from './../Pages/Organization/myprofileorganization/components/add-center-account/add-center-account';
import { Routes } from '@angular/router';
import { roleGuard } from '../Core/guards/role.guard';
import { Home } from '../Pages/home/home';
import { MainLayoutOrganization } from '../Layout/Organization/main-layout-organization/main-layout-organization';

export const organizationRoutes: Routes = [
  {
    path: 'organization',
    component: MainLayoutOrganization,
    canActivate: [roleGuard(['organization'])],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: Home },
      {
        path: 'ordersNew',
        loadComponent: () => import('../Pages/Organization/orders/orders').then(m => m.Orders),
      },
      {
        path: 'organizations',
        loadComponent: () => import('../Pages/Organization/organizations/organizations').then(m => m.Organizations),
      },
      {
        path: 'center/:id',
        loadComponent: () => import('../Pages/Organization/centers/centers').then(m => m.Centers),
      },
      {
        path: 'centerDetails/:id',
        loadComponent: () => import('../Pages/Organization/center-details/center-details').then(m => m.CenterDetails),
      },
      {
        path: 'myporfile',
        loadComponent: () => import('../Pages/Organization/myprofileorganization/myprofileorganization').then(m => m.Myprofileorganization),
        children: [
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
          {
            path: 'personal-info',
            loadComponent: () => import('../Pages/Organization/myprofileorganization/components/personal-info/personal-info').then(m => m.PersonalInfo),
          },
          {
            path: 'addCenterAccount',
            loadComponent: () => import('../Pages/Organization/myprofileorganization/components/add-center-account/add-center-account').then(m => m.AddCenterAccount),
          },
      
          {
            path: 'location',
            loadComponent: () => import('../Pages/Organization/myprofileorganization/components/location/location').then(m => m.Location),
          },
          {
            path: 'change-password',
            loadComponent: () => import('../Pages/Customer/changepassword/changepassword').then(m => m.Changepassword),
          },
        ],
      },
      {
        path: 'addsuggest',
        loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/suggestion/components/addsuggest/addsuggest').then(m => m.Addsuggest),
        outlet: 'popup',
      },
       {
        path: 'addschedule',
        loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/schedule/addschedule/addschedule').then(m => m.Addschedule),
        outlet: 'popup',
      },
      {
        path: 'addcomplaint',
        loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/complaints/components/add-complaint/add-complaint').then(m => m.AddComplaint),
        outlet: 'popup',
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
