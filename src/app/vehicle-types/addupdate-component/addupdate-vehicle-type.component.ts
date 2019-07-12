import { Component, ChangeDetectorRef } from '@angular/core';
import { VehicleTypeService } from '../services/vehicle-type.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages';

import tsMessages  = require('../../tsmessage');

@Component({
  templateUrl: 'addupdate-vehicle-type.component.html'
})
export class AddUpdateVehicleTypeComponent {
	
    public vtypes = {
        name:''
    };

    public isLoading       = false;
    public isPageLoading   = true;
    public typeID: any;
    public response:any;
    public errMessage = '';

    constructor(
        private _router : Router, 
        private _activateRouter: ActivatedRoute, 
        private _vehicleTypeService: VehicleTypeService,
        private _flashMessagesService: FlashMessagesService, 
        private _cookieService: CookieService,
        private _commanService: CommanService, 
        private _changeDetectorRef: ChangeDetectorRef ) { 
        this.typeID = _activateRouter.snapshot.params['id'];        

        if( this.typeID ) {
            this._vehicleTypeService.get(this.typeID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    console.log("vstypes is ",res)
                    this.vtypes = res.data.vtypes;
                    //if(!this.vtypes["name"]) this.vtypes["name"] = this.vtypes["name"];
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
        let data = JSON.parse(JSON.stringify(this.vtypes));
        if(this.typeID) {
            this._vehicleTypeService.update(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res;
                    this._cookieService.put('categoryAlert', res.data.message);
                    this._router.navigate(['/vehicle-types/list']);
                } else {
                    this._cookieService.put('categoryExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this._vehicleTypeService.add(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res;
                    this._cookieService.put('categoryAlert', res.data.message);
                    this._router.navigate(['/vehicle-types/list']);
                } else {
                    this._cookieService.put('categoryExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            });
            
        }
    }

    showDangerAlert(): void {

        let alertMessage = this._cookieService.get('categoryExistAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
            this._cookieService.remove('categoryExistAlert');
        }    
    }

    trim(key) {
        if(this.vtypes[key] && this.vtypes[key][0] == ' ') this.vtypes[key] = this.vtypes[key].trim();
    }
    
}
