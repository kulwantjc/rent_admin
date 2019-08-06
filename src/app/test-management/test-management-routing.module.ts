import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { ListComponent } from './list/list.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';
import { HttpModule } from '@angular/http';
import { ViewComponent } from './view/view.component';
import { TestManagementService } from './services/test-management.service';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'TestManagement'
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
        component: AddupdateComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add'
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
        component: AddupdateComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit Text'
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
  ],
  providers: [
    TestManagementService
  ],
})
export class TestManagementRoutingModule {}
