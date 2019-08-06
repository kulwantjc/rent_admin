import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { ListOptionManagementComponent } from './list-option-management/list-option-management.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';
import { HttpModule } from '@angular/http';
import { OptionManagementService } from './service/option-management.service';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'AdsManagement'
    },
    children: [
     {
        path: '',
        component: ListOptionManagementComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListOptionManagementComponent,
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
      // {
      //   path: 'list/:id',
      //   component: ViewCategoryComponent,
      //   canActivate: [ChildRouteGuard],
      //   data: {
      //     title: 'View'
      //   }
      // },
      // {
      //   path: 'edit/:id',
      //   component: AddUpdateCategoryComponent,
      //   canActivate: [ChildRouteGuard],
      //   data: {
      //     title: 'Edit Category'
      //   }
      // }
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
    OptionManagementService
  ],
})
export class OptionManagementRoutingModule {}
