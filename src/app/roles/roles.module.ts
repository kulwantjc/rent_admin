import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { ListRoleComponent } from './list-component/list-role.component';
import { AddUpdateRoleComponent } from './addupdate-component/addupdate-role.component';
import { ViewRoleComponent } from './view-component/view-role.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleService } from './services/role.service';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
  	 RolesRoutingModule,
  	 CommonModule,
     NG2DataTableModule,
     CustomFormsModule,
     SharedModule    
  ],
  providers: [
  	RoleService
  ],
  declarations: [
  	ListRoleComponent,
  	AddUpdateRoleComponent,
  	ViewRoleComponent
  ]
})
export class RolesModule { }