import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";

import { ListVehicleTypeComponent } from './list-component/list-vehicle-type.component';
import { AddUpdateVehicleTypeComponent } from './addupdate-component/addupdate-vehicle-type.component';
import { ViewVehicleTypeComponent } from './view-component/view-vehicle-type.component';
import { VehicleTypesRoutingModule } from './vehicle-types-routing.module';
import { CustomFormsModule } from 'ng2-validation'
import { SharedModule } from '../shared/shared.module';
import { FlashMessagesModule } from 'ngx-flash-messages';
@NgModule({
    imports: [
      	VehicleTypesRoutingModule,
      	CommonModule,
        NG2DataTableModule,
        CustomFormsModule,
        FlashMessagesModule,
        SharedModule    
    ],
    declarations: [
      	ListVehicleTypeComponent,
      	AddUpdateVehicleTypeComponent,
      	ViewVehicleTypeComponent
    ]
})
export class VehicleTypesModule { }