import { Component, ChangeDetectorRef } from '@angular/core';
import { AutomationService } from '../services/automation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { CommanService } from '../../shared/services/comman.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import tsConstants = require('./../../tsconstant');
import tsMessages  = require('../../tsmessage');

@Component({
  templateUrl: 'addupdate.component.html'
})

export class AddUpdateComponent {
    private _host = tsConstants.HOST;

    public object = {
        driver_id:'',
        schedule_date:null,
        schedule_time_from:'10:00AM',
        schedule_time_to:'02:00PM',
        openshift_time_to:'',
        openshift_time_from:'',
        availability_time_from:'',
        availability_time_to:'',
        message:'',
        replace_driver_id:'',
        day:'1',
        city:''
    };
    public cities          = [];
        
    public isLoading       = false;
    public isPageLoading   = false;
    public ID:any;
    public business_types   = [];
    public type:any;
    constructor( private _router : Router,
                private _activateRouter: ActivatedRoute, 
                private _automationService: AutomationService,
                private _commanService: CommanService, 
                private changeDetectorRef: ChangeDetectorRef ) { 

        this.ID = _activateRouter.snapshot.params['id'];
        this.type = _activateRouter.snapshot.queryParams['type'];
        if(this.ID) this.fetch();
        this.getUsers();
        this.allCities();
    }

    allCities() {
        this._commanService.allCities().subscribe(res => {
            if(res.success) {
                let data = res.data.data
                for (var i = 0; i < data.length; ++i) {
                    // code...
                this.cities.push(data[i].name);
                }
            }
        },err => {
            this.isLoading = false;
        });
    }

    fetch() {

        this._automationService.get(this.ID).subscribe(res => {
            this.isLoading = false;
            if(res.success) {
                let data = res.data[0];
                this.object = data;
                this.object.schedule_date     = this._commanService.convertDateToDateObject(data.schedule_date);
                let id  = data.driver_id.id;
                this.object.driver_id = id
                if(data.replace_driver_id) {
                    let replace_driver_id  = data.replace_driver_id.id;
                    this.object.replace_driver_id = replace_driver_id
                }
            } else {
                this._commanService.checkAccessToken(res.error);
                this._commanService.showAlert(res.error.message,'alert-danger');
            }
        },err => {
            this.isLoading = false;
        });
    }

     /*If id exist then will update existing dispensary otherwise will add new dispensary*/
    save() {
        this.isLoading         = true;
        let data               = JSON.parse(JSON.stringify(this.object));

        data.schedule_date = data.schedule_date.formatted;
        this._automationService.add(data).subscribe(res => {
            this.isLoading = false;
            if(res.success) {
                this._commanService.showAlert(res.message,'alert-success');
                    this._commanService.back();  
            } else {
                this._commanService.checkAccessToken(res.error);
                this._commanService.showAlert(res.error.message,'alert-danger');
            }
        },err => {
            this.isLoading = false;
        });
    }

    /*Get all Users */
    getUsers(): void {
        this._automationService.getAllUsers( 100000, 1, 'createdAt desc', '', "DRIVER" ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.business_types          = res.data.users;
            } else {
                this._commanService.checkAccessToken(res.error);
            }
        },err => {
            this.isLoading     = false;
            this.isPageLoading = false;
       });             
    }

    trim(key) {
        if(this.object[key] && this.object[key][0] == ' ') this.object[key] = this.object[key].trim();
    }

    onDateChanged(event: IMyDateModel): void {
        // date selected
    }
}
