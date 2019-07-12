import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  templateUrl: 'view-settings.component.html'
})
export class ViewSettingsComponent {

	public setting:any                 = {};
    public isLoading:boolean       = true;
    public addEditDelete:boolean   = false;

    constructor(
        private _router: Router, 
        private _activatedRouter: ActivatedRoute,  
        private _settingsService: SettingsService,
        private _commanService: CommanService ) {

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['settings']['addEditDelete']) this.addEditDelete = true;

        this._commanService.getSettings().subscribe( res => {
            this.isLoading = false;
            if(res.success) {
                this.setting     = res.data[0];
            } else {
                this._commanService.checkAccessToken(res.error);
            }
        }, err => {
            this.isLoading = false;
            this._commanService.checkAccessToken(err);
        });

    }

    edit( key ) {        
        let route = '/settings/edit';
        this._router.navigate([route],{queryParams:{tab:key}});       
    }   

}