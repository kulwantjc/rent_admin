import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';
import { ListComponent } from './list-component/list.component';
import { AddUpdateComponent } from './addupdate-component/addupdate.component';
import { ViewComponent } from './view-component/view.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Scheduler'
    },
    children: [
     {
        path: '',
        component: ListComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        component: AddUpdateComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add Scheduler'
        }
      },
      {
        path: 'list/:id',
        component: ViewComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'View'
        }
      },
      {
        path: 'edit/:id',
        component: AddUpdateComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit'
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
export class SchedulerRoutingModule {}
