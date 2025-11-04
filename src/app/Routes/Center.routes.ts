import { Routes } from '@angular/router';
import { MainLayoutEngineer } from '../Layout/Engineer/main-layout-engineer/main-layout-engineer';
import { roleGuard } from '../Core/guards/role.guard';
import { Home } from '../Pages/home/home';
import { MainlayoutCenter } from '../Layout/Center/mainlayout-center/mainlayout-center';

export const engineerRoutes: Routes = [
  {
    path: 'SubOrganization',
    component: MainlayoutCenter,
    canActivate: [roleGuard(['SubOrganization'])],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: Home },
      {
        path: 'ordersNew',
        loadComponent: () => import('../Pages/Engineer/orders/orders').then(m => m.Orders),
      },
      {
        path: 'organizations',
        loadComponent: () => import('../Pages/Engineer/organizations/organizations').then(m => m.Organizations),
      },
      {
        path: 'center/:id',
        loadComponent: () => import('../Pages/Engineer/centers/centers').then(m => m.Centers),
      },
      {
        path: 'centerDetails/:id',
        loadComponent: () => import('../Pages/Engineer/center-details/center-details').then(m => m.CenterDetails),
      },
      {
        path: 'myporfile',
        loadComponent: () => import('../Pages/Engineer/myporfileenginerer/myporfileenginerer').then(m => m.MyporfileEngineer),
        children: [
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
          {
            path: 'personal-info',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/personal-info/personal-info').then(m => m.PersonalInfo),
          },
          {
            path: 'suggestions',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/suggestion/suggestion').then(m => m.Suggestion),
          },
          {
            path: 'complaints',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/complaints/complaints').then(m => m.Complaints),
          },
          {
            path: 'bookings',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/bookings/bookings').then(m => m.Bookings),
          },
             {
            path: 'Schedule',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/schedule/schedule').then(m => m.Schedule),
          },
             {
            path: 'rates',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/rates/rates').then(m => m.Rates),
          },
          {
            path: 'location',
            loadComponent: () => import('../Pages/Engineer/myporfileenginerer/components/location/location').then(m => m.Location),
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
