import { Routes } from '@angular/router';
import { MainLayoutCoustomer } from '../Layout/Coustomer/main-layout-coustomer/main-layout-coustomer';
import { HomeCustomer } from '../Pages/homeCustomer/home';
import { roleGuard } from '../Core/guards/role.guard';

export const customerRoutes: Routes = [
  {
    path: '',
    component: MainLayoutCoustomer,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeCustomer },
      {
        path: 'category',
                canActivate: [roleGuard(['customer'])],

        loadComponent: () => import('../Pages/Customer/categories/categories').then(m => m.Categories),
      },
      {
        path: 'service/:categoryId',
                canActivate: [roleGuard(['customer'])],

        loadComponent: () => import('../Pages/Customer/service/service').then(m => m.Service),
      },
      {
        path: 'about',
        loadComponent: () => import('../Pages/about/about').then(m => m.About),
      },
      {
        path: 'contact',
        loadComponent: () => import('../Pages/contactus/contactus').then(m => m.Contactus),
      },
      {
        path: 'chooseworker/:serviceId',
        loadComponent: () => import('../Pages/Customer/choose-engineer/choose-engineer').then(m => m.ChooseEngineer),
      },
      {
        path: 'profile/:profileId',
        loadComponent: () => import('../Pages/Customer/worker-profile/worker-profile').then(m => m.WorkerProfile),
      },

      // 👇 الصفحات اللي تتطلب تسجيل دخول فقط
      {
        path: 'myporfile',
        canActivate: [roleGuard(['customer'])],
        loadComponent: () => import('../Pages/Customer/myporfile/myporfile').then(m => m.Myporfile),
        children: [
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
          {
            path: 'personal-info',
            loadComponent: () => import('../Pages/Customer/myporfile/components/personal-info/personal-info').then(m => m.PersonalInfo),
          },
          {
            path: 'suggestions',
            loadComponent: () => import('../Pages/Customer/myporfile/components/suggestion/suggestion').then(m => m.Suggestion),
          },
          {
            path: 'complaints',
            loadComponent: () => import('../Pages/Customer/myporfile/components/complaints/complaints').then(m => m.Complaints),
          },
          {
            path: 'bookings',
            loadComponent: () => import('../Pages/Customer/myporfile/components/bookings/bookings').then(m => m.Bookings),
          },
          {
            path: 'location',
            loadComponent: () => import('../Pages/Customer/myporfile/components/location/location').then(m => m.Location),
          },
          {
            path: 'change-password',
            loadComponent: () => import('../Pages/Customer/changepassword/changepassword').then(m => m.Changepassword),
          },
        ],
      },
      {
        path: 'orderDetials/:id',
        canActivate: [roleGuard(['customer'])],
        loadComponent: () => import('../Pages/Customer/order-detials/order-detials').then(m => m.OrderDetials),
      },
      {
        path: 'addsuggest',
        canActivate: [roleGuard(['customer'])],
        loadComponent: () => import('../Pages/Customer/myporfile/components/suggestion/components/addsuggest/addsuggest').then(m => m.Addsuggest),
        outlet: 'popup',
      },
      {
        path: 'addcomplaint',
        canActivate: [roleGuard(['customer'])],
        loadComponent: () => import('../Pages/Customer/myporfile/components/complaints/components/add-complaint/add-complaint').then(m => m.AddComplaint),
        outlet: 'popup',
      },
      { path: 'myporfile/infomation', canActivate: [roleGuard(['customer'])], loadComponent: () => import('../Pages/Customer/infomation/infomation').then(m => m.Infomation) },
    ],
  },
];
