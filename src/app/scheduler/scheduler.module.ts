import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { AutomationService } from './services/automation.service';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list-component/list.component';
import { AddUpdateComponent } from './addupdate-component/addupdate.component';
import { ViewComponent } from './view-component/view.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { CustomFormsModule } from 'ng2-validation';
// import { DatePickerModule } from 'ng2-datepicker';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FullCalendarModule } from 'ng-fullcalendar';
@NgModule({
  imports: [
  	SchedulerRoutingModule,
  	 CommonModule,
     NG2DataTableModule,
     CustomFormsModule,
     FlashMessagesModule,
     SharedModule,
     NgxMyDatePickerModule,
     FullCalendarModule
  ],
  providers: [
    AutomationService
  ],
  declarations: [
  	ListComponent,
  	AddUpdateComponent,
  	ViewComponent
  ]
})
export class SchedulerModule { }