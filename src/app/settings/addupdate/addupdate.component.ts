import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommanService } from '../../shared/services/comman.service';
import tsMessages  = require('../../tsmessage');
declare var jQuery:any;

@Component({
  templateUrl: 'addupdate.component.html'
})
export class AddUpdateSettingsComponent {
    
    public setting = {
       commission: {
           admin:null,
           store:null
       },
       reward: {
           dispensary:null,
           product:null
       },
       tax_percentage:null,
       fare_charges:[{
           min:null,
           max:null,
           fare:null
       }]
    };

    public isLoading       = false;
    public isPageLoading   = true;
    private tab:any;
    
    constructor(
        private _router : Router,
        private _activateRouter: ActivatedRoute, 
        private _commanService: CommanService,
        private _settingsService: SettingsService ) {
      
        this._commanService.getSettings().subscribe( res => {
            if(res.success) {
                this.setting = res.data[0];
            } else {
                this._commanService.checkAccessToken(res.error);
            }
            this.isPageLoading = false;
            if(this.tab)  {
                setTimeout(()=>{
                    let tabid = "#"+this.tab + 'TAB'
                    jQuery( tabid )[0].click();
                },1);
            }
        }, err => {
            this.isPageLoading = false;
            this._commanService.checkAccessToken(err);
        });

    }

    ngOnInit(): void {
        this.tab = this._activateRouter.snapshot.queryParams['tab'];
    }

    /*If settingID exist then will update existing setting otherwise will add new setting*/
    save() {

        let data = JSON.parse(JSON.stringify(this.setting));
       
        let percentage = data.commission.admin + data.commission.store;
        if(percentage <= 100 ) {
            this.isLoading = true;
            this._settingsService.update(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this._commanService.showAlert(res.message,'alert-success');
                    this._router.navigate(['/settings/list']);
                } else {
                    this._commanService.showAlert(res.error.message,'alert-danger');
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            if(percentage > 100) this._commanService.showAlert('Commission %age total should be less than or equal to 100','alert-danger');
        }

    }

    addFareCharges() {
        this.setting.fare_charges.push({
            min:null,
            max:null,
            fare:null
        })
    }

    removeFareCharges(index) {
        this.setting.fare_charges.splice(index,1);
    }

}
