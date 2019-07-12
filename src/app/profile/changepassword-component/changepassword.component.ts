import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: 'changepassword.component.html'
})
export class ChangePasswordComponent implements OnInit {

	public password	      = '';
    public newPassword    = '';
    public confirmPassword= '';
	public errMessage 	  = '';
	public isPageLoading  = false;
    // public currentUser = { 
    //     firstName:'',
    //     lastName:'',
    //     email:''
    // };
    
    public user = {
        id:'',
        currentPassword:'',
        newPassword:'',
        confirmPassword:''
    };

	constructor(private _router : Router,
     private _profileService: ProfileService,
      private _commanService: CommanService) { }

	ngOnInit() {
        //this.isPageLoading = true;
        this.getCurrentUser();
    }

    submit() {
        this.isPageLoading     = true;
        // let id = this.getCurrentUser()

        this.errMessage        = '';  
		
        this._profileService.changePassword(this.user).subscribe(res => {
            this.isPageLoading = false;
            if(res.success) {
                this._commanService.showAlert(res.message,'alert-success');
                this._commanService.back();
                  
            } else {
                this.errMessage     = res.error.message;
                  
            }
        },err => {       
            this.isPageLoading = false;
            
        });
	}

    getCurrentUser(){
        this.errMessage        = '';  
        this.isPageLoading = false;
        this._profileService.getcurrentuser().subscribe(res => {
            // this.currentUser  = res.id;
            this.user['id'] = res.id;
        });
    }
}
