import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: 'myprofile.component.html'
})
export class MyprofileComponent implements OnInit {

	
	  public errMessage 	  = '';
    public successMessage = '';
	  public isPageLoading  = false;
    public isLoading:boolean = false;
    public currentUser:any = { };
    public user = { id:'', currentPassword:'', newPassword:'', confirmPassword:'' };
    
    @ViewChild('cpasswordModal') public cpasswordModal: ModalDirective;
	  
    constructor(
      private _router : Router, 
      private _profileService: ProfileService, 
      private _commanService:CommanService,
      private _cookieService: CookieService) { }

	  ngOnInit() {
        //this.isPageLoading = true;
         this.getCurrentUser();
	  }

    submit() {
      
        this.isPageLoading     = true;
        this.isLoading     = true;
        this.errMessage        = '';  
    
        this._profileService.changePassword(this.user).subscribe(res => {
            this.isPageLoading = false;
            if(res.success) {
              this.isLoading     = false;
                this._commanService.showAlert(res.message,'alert-success');
                this.cpasswordModal.hide();             
                this.isPageLoading = false;
                //this._commanService.back();
   
            } else {
                this.errMessage     = res.error.message;
                this.isLoading     = false;
                  
            }
        },err => {       
            this.isPageLoading = false;
            
        });
  }

    getCurrentUser(){
        this.errMessage        = '';  
        this.isPageLoading = false;
        this._profileService.getcurrentuser().subscribe(res => {
           
            this.currentUser  = res
            this.user['id'] = this.currentUser.id;
        });
    }

   }