import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { FormsModule } from '@angular/forms';


import { DashboardService } from './services/dashboard.service';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { Daterangepicker } from 'ng2-daterangepicker';

import { ImageUploadModule } from 'ng2-imageupload';
// import { CropService } from '../crops/services/crop.service';
import { DashboardComponent } from './dashboard/dashboard.component';

 
@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    NG2DataTableModule,
    ChartsModule,
    NgxMyDatePickerModule,
    CustomFormsModule,
    FlashMessagesModule,
    SharedModule,
    Daterangepicker,
    ImageUploadModule,
    FormsModule
  ],
  providers: [
    DashboardService
    // CropService
  ],
  declarations: [DashboardComponent],
  entryComponents: []
})
export class DashboardModule { }
