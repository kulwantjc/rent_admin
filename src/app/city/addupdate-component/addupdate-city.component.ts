import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';
import { FlashMessagesService } from 'ngx-flash-messages';

import tsMessages  = require('../../tsmessage');

@Component({
  templateUrl: './addupdate-city.component.html'
})
export class AddupdateCityComponent implements OnInit {

	public city     = {
        name:'',
        province:'',
        isForDelivery:''
    };

    public isLoading       = false;
    public isPageLoading   = true;
    public cityID: any;
    public response:any;
    public type;
    public errMessage = '';
    public province          = [];
    
  	constructor(
        private _router : Router,
        private _activateRouter: ActivatedRoute, 
        private _cityService: CityService, 
        private _flashMessagesService: FlashMessagesService, 
        private _cookieService: CookieService,
        private _commanService: CommanService,
        private changeDetectorRef: ChangeDetectorRef ) {

        this.cityID = _activateRouter.snapshot.params['id'];        

        if( this.cityID ) {
            this._cityService.get(this.cityID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    this.city = res.data.city;
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
            }, err => {
                this.isPageLoading = false;
                this._commanService.checkAccessToken(err);
            });
        } else {
            this.isPageLoading = false;
        }
    }

  	ngOnInit(): void {
        this.showDangerAlert();
    }

    save() {
        this.isLoading = true;
        let data = JSON.parse(JSON.stringify(this.city));
        if(this.cityID) {
            console.log("fsdf",this.cityID)
            this._cityService.update(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res.data.city;
                    this._cookieService.put('cityAlert', res.data.message);
                    this._router.navigate(['/city/list']);
                } else {
                    this._cookieService.put('cityExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this._cityService.add(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res.data.city;
                    this._cookieService.put('cityAlert', res.data.message);
                    this._router.navigate(['/city/list']);
                } else {
                    this._cookieService.put('cityExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            });
            
        }
    }

    showDangerAlert(): void {

        let alertMessage = this._cookieService.get('cityExistAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
            this._cookieService.remove('cityExistAlert');
        }    
    }

    trim(key) {
        if(this.city[key] && this.city[key][0] == ' ') this.city[key] = this.city[key].trim();
    }

}
