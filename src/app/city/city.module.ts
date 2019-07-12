import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { CityService } from './services/city.service';
import { SharedModule } from '../shared/shared.module';
import { ListCityComponent } from './list-component/list-city.component';
import { CityRoutingModule } from './city-routing.module';
import { AddupdateCityComponent } from './addupdate-component/addupdate-city.component';
import { CustomFormsModule } from 'ng2-validation';
// import { DatePickerModule } from 'ng2-datepicker';
import { FlashMessagesModule } from 'ngx-flash-messages';

@NgModule({
  imports: [
    CommonModule,
    CityRoutingModule,
    NG2DataTableModule,
    CustomFormsModule,
    FlashMessagesModule,
    SharedModule
  ],
  providers: [
    CityService
  ],
  declarations: [
  	ListCityComponent,
  	AddupdateCityComponent

  ]
})
export class CityModule { }
