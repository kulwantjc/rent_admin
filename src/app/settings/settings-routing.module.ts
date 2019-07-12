import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AddUpdateSettingsComponent } from './addupdate/addupdate.component';
import { ViewSettingsComponent } from './view-settings/view-settings.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
     {
        path: '',
        component: ViewSettingsComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ViewSettingsComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'edit',
        component: AddUpdateSettingsComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit Settings'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule
  ],
  exports: [
    RouterModule,
    FormsModule
  ]
})
export class SettingsRoutingModule {}
