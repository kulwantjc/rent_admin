import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';
import { ListVehicleTypeComponent } from './list-component/list-vehicle-type.component';
import { AddUpdateVehicleTypeComponent } from './addupdate-component/addupdate-vehicle-type.component';
import { ViewVehicleTypeComponent } from './view-component/view-vehicle-type.component';
import { HttpModule } from '@angular/http';
import { VehicleTypeService } from './services/vehicle-type.service';
import { ChildRouteGuard } from '../auth/services/child-route-guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vehicle Type'
    },
    children: [
      {
        path: '',
        component: ListVehicleTypeComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListVehicleTypeComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        component: AddUpdateVehicleTypeComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add Vehicle Types'
        }
      },
      {
        path: 'list/:id',
        component: ViewVehicleTypeComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'View'
        }
      },
      {
        path: 'edit/:id',
        component: AddUpdateVehicleTypeComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit Vehicle Type'
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
  providers: [
    VehicleTypeService
  ],
  exports: [
    RouterModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule
  ]
})
export class VehicleTypesRoutingModule {}
