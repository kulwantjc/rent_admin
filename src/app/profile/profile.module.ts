import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './changepassword-component/changepassword.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyprofileComponent } from './myprofile-component/myprofile.component';
import { ProfileService } from './services/profile.service';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';
import { EqualValidator } from '../profile/equal-validator.directive';
import { CommanService } from '../shared/services/comman.service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';
import { EditprofileComponent } from './editprofile/editprofile.component';

@NgModule({
  imports: [
     ProfileRoutingModule,
     CommonModule,
     CustomFormsModule,
     ModalModule.forRoot(),
     SharedModule,
     FormsModule    
  ],
  providers: [
    ProfileService,
    CommanService
  ],
  declarations: [
    ChangePasswordComponent,
    MyprofileComponent,
    EqualValidator,
    EditprofileComponent,    
  ]
})
export class ProfileModule { }