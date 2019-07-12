import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommanService } from '../../shared/services/comman.service';
import { ViewUserImageComponent } from '../../modals/view-image/viewUserImage.component';
import { DialogService } from "ng2-bootstrap-modal";
import tsMessages  = require('../../tsmessage');
import tsConstants = require('./../../tsconstant');

@Component({
    templateUrl: 'view-user.component.html'
})
export class ViewUserComponent {
    private _host = tsConstants.HOST;
    
    public userID        = '';
	public user          = {};
    public isLoading     = false;
    public isPageLoading = true;
    public addEditDelete = false

    constructor(
        private _route: ActivatedRoute, 
        private _router : Router,
        private _userService: UserService,
        private _commanService: CommanService,
        private _dialogService: DialogService ) { 

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['users']['addEditDelete']) this.addEditDelete = true;

        this.userID = _route.snapshot.params['id'];
  	    this._userService.get(this.userID).subscribe(res => {
            if(res.success) {
               this.user = res.data;
               this.isPageLoading = false;
            } else {
               this._commanService.checkAccessToken(res.error); 
            } 
        },err => {
           this.isPageLoading = false
        });
    }

    editUser(userid) {        
        let route = '/users/edit/'+ userid;
        this._router.navigate([route]);       
    }

    changeStatus(user) {
        let status     = '';
        let message    = tsMessages.DO_YOU_WANT_TO_ACTIVATE_USER;
        if(user.status == 'active') {
            status     = "deactive";
            message    = tsMessages.DO_YOU_WANT_TO_DEACTIVATE_USER;
        } else {
            status = "active";
        }

        if(confirm(message)) {
            this.isLoading = true;
            this._commanService.changeStatus(user.id,'users',status).subscribe(res => {
                this.isLoading    = false;
                if(res.success) {
                    this.user["status"] = status;
                    this._commanService.showAlert(res.data.message,'alert-success');
                    /* reload page. */
                } else {
                    this._commanService.showAlert(res.error.message,'alert-danger');
                }
            },err => {
                this.isLoading = false;
            });             
        }
    }

     // Use to View Image Prompt
    viewImage(imageUrl) {
        this._dialogService.addDialog(ViewUserImageComponent, {
          imageUrl:imageUrl
        }).subscribe((res)=>{ });
    }

}
