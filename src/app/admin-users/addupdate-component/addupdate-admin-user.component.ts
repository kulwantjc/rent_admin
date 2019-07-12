import { Component, ChangeDetectorRef } from '@angular/core';
import { AdminUserService } from '../services/admin-user.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router,ActivatedRoute } from '@angular/router';

import tsMessages  = require('../../tsmessage');

@Component({
  templateUrl: 'addupdate-admin-user.component.html'
})
export class AddUpdateAdminUserComponent {
	
    public user = {
        roles:'A',
        roleId:'',
        roleID:'',
        status:'active',
        username1:''
    };

    public roles           = [];
    public isLoading       = false;
    public isPageLoading   = true;
    public userID:any;

    constructor(
        private _router : Router, 
        private _activateRouter: ActivatedRoute, 
        private _adminUserService: AdminUserService,
        private _commanService: CommanService, 
        private _changeDetectorRef: ChangeDetectorRef ) { 
        this.userID = _activateRouter.snapshot.params['id'];        

        if( this.userID ) {
            this._adminUserService.get(this.userID).subscribe(res => {
                if(res.success) {
                    this.user = res.data;
                    this.user['roleID'] = res.data.roleId ? res.data.roleId : '';
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
                this.isPageLoading = false;
            },err => {
                this.isPageLoading = false;
                this._commanService.checkAccessToken(err);
            });
        } else {
            this.isPageLoading = false;
        }
        
      
        setTimeout(()=>{
            /*Use to get all roles*/
            this._adminUserService.getRoles().subscribe( res => { 
                if(res.success) {
                    this.roles = res.data.roles;
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {});
        },1);
    } 

    /*If useID exist then will update existing user otherwise will add new user*/
    save() {
        let data = JSON.parse(JSON.stringify(this.user));
        
        data["roleId"]   = data["roleID"];
        delete data["roleID"];

        this.isLoading = true;
        if(this.userID) {
            data["username"] = data["email"];
            this._adminUserService.update(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this._commanService.showAlert(tsMessages.RECORD_UPDATED_SUCCESSFULLY,'alert-success');                    
                    this._commanService.back();
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {
                this.isLoading = false;
                this._commanService.checkAccessToken(err);
            })
        } else {
            data["email"] = data["email"] //+ '@instaleaf.ca';
            data["username"] = data["email"];
            this._adminUserService.add(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this._commanService.showAlert(res.data.message,'alert-success');
                    this._commanService.back();
                } else {
                     this._commanService.showAlert(res.error.message,'alert-danger');
                }
            },err => {
                this.isLoading = false;
            });
        }
    }

    trim(key) {
        if(this.user[key] && this.user[key][0] == ' ') this.user[key] = this.user[key].trim();
    }
    
}
