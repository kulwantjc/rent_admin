import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Daterangepicker } from 'ng2-daterangepicker';

import { CommanService } from './services/comman.service';
import { LoaderComponent } from './loader/loader.component';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ImagePopupComponent } from './image-popup/image-popup.component';

import { ModalModule } from 'ng2-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    ModalModule.forRoot(),
    Daterangepicker
  ],
  providers:[CommanService],
  declarations: [
  	LoaderComponent,
  	CapitalizePipe,
  	ProgressBarComponent,
  	ImagePopupComponent
  ],
  exports: [
  	LoaderComponent,
  	CapitalizePipe,
  	ProgressBarComponent,
    ImagePopupComponent
  ]
})
export class SharedModule { }
