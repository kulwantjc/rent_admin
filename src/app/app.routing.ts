import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'
import { ActiveRouteGuard } from './auth/services/activate-route-guard';
import { DeactiveRouteGuard } from './auth/services/deactivate-route-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ActiveRouteGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ActiveRouteGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: ''  //Home
    },
    canActivate: [DeactiveRouteGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'      
      },
      
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'      
      },
      
      {
        path: 'scheduler',
        loadChildren: './scheduler/scheduler.module#SchedulerModule'      
      },
      
      {
        path: 'city',
        loadChildren: './city/city.module#CityModule'      
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'      
      },
      
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'      
      },
      {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule'      
      },
      {
        path: 'admin-users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule'      
      },
      {
        path: 'vehicle-types',
        loadChildren: './vehicle-types/vehicle-types.module#VehicleTypesModule'      
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes),HttpModule ],
  exports: [ RouterModule,HttpModule ]
})
export class AppRoutingModule {}
