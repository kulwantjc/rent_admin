import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestManagementRoutingModule } from'./test-management-routing.module';
import { ListComponent } from './list/list.component';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';

import { ImageUploadModule } from 'ng2-imageupload';


//import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    NG2DataTableModule,
   // MatCheckboxModule,
    ImageUploadModule,
    CustomFormsModule,
    SharedModule,
    TestManagementRoutingModule
  ],
  declarations: [
    ListComponent,
    AddupdateComponent,
    ViewComponent
  ]
})
export class TestManagementModule { }
