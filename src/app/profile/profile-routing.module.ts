import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ChangePasswordComponent } from './changepassword-component/changepassword.component';
import { MyprofileComponent } from './myprofile-component/myprofile.component';
import { HttpModule } from '@angular/http';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: '',
        component: MyprofileComponent,
        data: {
          title: 'My Profile'
        }
      },
      {
        path: 'myprofile',
        component: MyprofileComponent,
        data: {
          title: 'My Profile'
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password'
        }
      }     
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule
  ],
  exports: [
    RouterModule,
    FormsModule,
  ]
})
export class ProfileRoutingModule {}
