import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';
import { ListCityComponent } from './list-component/list-city.component';
import { AddupdateCityComponent } from './addupdate-component/addupdate-city.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'City'
    },
    children: [
     {
        path: '',
        component: ListCityComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListCityComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        component: AddupdateCityComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add City'
        }
      },
      {
        path: 'edit/:id',
        component: AddupdateCityComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit City'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    Ng2TableModule,
    PaginationModule,
    HttpModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule
  ]
})
export class CityRoutingModule { }
