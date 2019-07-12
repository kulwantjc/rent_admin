import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";

import { ListUserComponent } from './list-component/list-user.component';
import { AddUpdateUserComponent } from './addupdate-component/addupdate-user.component';
import { ViewUserComponent } from './view-component/view-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { CustomFormsModule } from 'ng2-validation'
import { SharedModule } from '../shared/shared.module';
import { ImageUploadModule } from 'ng2-imageupload';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ViewUserImageComponent } from '../modals/view-image/viewUserImage.component';

@NgModule({
    imports: [
      	UsersRoutingModule,
      	CommonModule,
        NG2DataTableModule,
        CustomFormsModule,
        SharedModule,
        ImageUploadModule,
        BootstrapModalModule
    ],
    declarations: [
        ListUserComponent,
        AddUpdateUserComponent,
        ViewUserComponent,
        ViewUserImageComponent    
    ],
    //Don't forget add component to entryComponents section
    entryComponents: [
      ViewUserImageComponent
    ],
})
export class UsersModule { }