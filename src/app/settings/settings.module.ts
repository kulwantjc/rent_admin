import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './services/settings.service';
import { SharedModule } from '../shared/shared.module';
import { AddUpdateSettingsComponent } from './addupdate/addupdate.component';
import { ViewSettingsComponent } from './view-settings/view-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
  	 SettingsRoutingModule,
  	 CommonModule,
     CustomFormsModule,
     SharedModule
  ],
  providers: [
    SettingsService
  ],
  declarations: [
  	AddUpdateSettingsComponent,
  	ViewSettingsComponent
  ]
})
export class SettingsModule { }