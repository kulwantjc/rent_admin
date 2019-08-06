import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { OptionManagementRoutingModule } from'./option-management-routing.module';
import { ListOptionManagementComponent } from './list-option-management/list-option-management.component';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';
import { OptionManagementService } from './service/option-management.service';

@NgModule({
  imports: [
   CommonModule,
   OptionManagementRoutingModule,
   NG2DataTableModule,
   CustomFormsModule,
   SharedModule
  ],
  providers: [
  	OptionManagementService,
  ],
  declarations: [
    AddupdateComponent, 
    ListOptionManagementComponent,
  ]
})
export class OptionManagementModule { }
