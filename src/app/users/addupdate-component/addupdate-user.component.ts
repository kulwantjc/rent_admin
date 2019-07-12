import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ViewUserImageComponent } from '../../modals/view-image/viewUserImage.component';
import { ImageResult } from 'ng2-imageupload';
import { DialogService } from "ng2-bootstrap-modal";
import tsMessages  = require('../../tsmessage');
import tsConstants = require('./../../tsconstant');

@Component({
  templateUrl: 'addupdate-user.component.html'
})
export class AddUpdateUserComponent {
	@ViewChild('myInput')
    myInputVariable: any;
    private _host = tsConstants.HOST;
    
    public user = {
        status:'active'
    };
    public isLoading       = false;
    public isPageLoading   = true;
    public userID:any;
    public states: any;
    public districts: any;
    public errMessage      = '';

    constructor(
        private _router : Router, 
        private _activateRouter: ActivatedRoute, 
        private _userService: UserService, 
        private _commanService: CommanService, 
        private changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService ) { 
        this.userID = _activateRouter.snapshot.params['id'];        

        if( this.userID ) {
            this._userService.get(this.userID).subscribe(res => {
                if(res.success) {
                    this.user = res.data;
                    if(!this.user["email"]) this.user["email"] = this.user["username"];
                    this.isPageLoading = false;
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {
                this.isPageLoading = false;
            });
        } else {
            this.isPageLoading = false;
        }
    } 

    /*If useID exist then will update existing user otherwise will add new user*/
    save() {
        this.isLoading = true;
        if(this.userID) {
            this.user["username"] = this.user["email"];
            this._userService.update(this.user).subscribe(res => {
                if(res.success) {                    
                    this.isLoading = false;
                    this._commanService.showAlert(tsMessages.RECORD_UPDATED_SUCCESSFULLY,'alert-success');
                    this._commanService.back();
                } else {
                    this._commanService.showAlert(res.error.message,'alert-danger');
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this.user["username"] = this.user["email"];
            this._userService.add(this.user).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this._commanService.showAlert(res.data.message,'alert-success');
                    this._commanService.back();
                } else {
                    this._commanService.showAlert(res.error.message,'alert-danger');
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {
                this.isLoading = false;
            });
        }
    }

    trim(key) {
        if(this.user[key] && this.user[key][0] == ' ') this.user[key] = this.user[key].trim();
    }

    // Use to View Image Prompt
    viewImage(imageUrl) {
        this._dialogService.addDialog(ViewUserImageComponent, {
          imageUrl:imageUrl
        }).subscribe((res)=>{ });
    }

    uploadImage(imageResult: ImageResult) {
        let object = {
            data:imageResult.dataURL,
            type:'users'
        }
        this.myInputVariable.nativeElement.value = "";
        this.isLoading = true;
        this._commanService.uploadImage(object).subscribe( res => {
            this.isLoading = false;
            if(res.success) {
                this.user['image'] = res.data.fullPath;
            } else {
                this._commanService.showAlert(res.error.message,'alert-danger');
            }
        },err => { this.isLoading = false; });
    }

}
