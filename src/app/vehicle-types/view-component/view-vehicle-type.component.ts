import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleTypeService } from '../services/vehicle-type.service';
import { CommanService } from '../../shared/services/comman.service';

import tsMessages  = require('../../tsmessage');

@Component({
    templateUrl: 'view-vehicle-type.component.html'
})
export class ViewVehicleTypeComponent {
	public userID = '';
	public user = {'markets':[]};
    public isLoading = false;
    public isPageLoading = true;
    public addEditDelete = false;
    public roles         = [];
    constructor(
        private _route: ActivatedRoute, 
        private _router : Router,
        private _vehicleTypeService: VehicleTypeService, 
        private _commanService: CommanService) {

        let actions = this._commanService.getActions();
        //if(actions["type"] == 'SA' || actions['adminUsers']['addEditDelete']) this.addEditDelete = true;

        // this.userID = _route.snapshot.params['id'];
  	    // this._adminUserService.get(this.userID).subscribe(res => {
        //     if(res.success) {
        //        this.user = res.data;
        //     } else {
        //        this._commanService.checkAccessToken(res.error);
        //     } 
        //     this.isPageLoading = false;
        // },err => {
        //    this.isPageLoading = false;
        //    this._commanService.checkAccessToken(err);
        // });

        /*Use to get all roles*/
        // this._adminUserService.getRoles().subscribe( res => { 
        //     if(res.success) {
        //         this.roles = res.data.roles;
        //     } else {
        //         this._commanService.checkAccessToken(res.error);
        //     }
        // },err => {});

    }

    /*editUser(userid) {        
        let route = '/admin-users/edit/'+ userid;
        this._router.navigate([route]);       
    }


    roleName(id) {
        let name;
        this.roles.forEach((obj)=>{
            if(id == obj.id) name = obj.name;
        })
        return name;
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
            //     } else {
            //         this._commanService.showAlert(res.error.message,'alert-danger');
            //     }
            // },err => {
            //     this.isLoading = false;
            // });             
        //}
   // }

}
