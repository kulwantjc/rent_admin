import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';
import { FullLayoutService } from '../../layouts/full-layout.service';
import tsConstants = require('./../../tsconstant');
import tsMessages = require('./../../tsmessage');
import { Location } from '@angular/common';

@Injectable()
export class CommanService {

    private _host = tsConstants.HOST;

  	constructor(  
        private _http: Http, 
        private _router: Router,
        private _cookieService: CookieService,
        private _flashMessagesService:FlashMessagesService,
        private _fullLayoutService:FullLayoutService,
        private _location: Location ) { 
    }

    /*This function is use to remove user session if Access token expired. */
  	checkAccessToken( err ): void {
        let code    = err.code;
        let message = err.message;

        if( (code == 401 && message == "authorization")) {
            this._cookieService.removeAll();
            this._router.navigate(['/login', {data: true}]);
        }else {
            
        }      
    }
    
    /*This function is use to get access token from cookie. */
    getAccessToken(): string {
        let token           = this._cookieService.get('token');
        return 'Bearer ' + token;
    }

    /*This function is use to get header with Authorization or without Authorization. */
    getAuthorizationHeader( access = true) {
        let headers = new Headers();
        
        if( access ) {
            let token   = this.getAccessToken();
            headers.append('Authorization',token);
        }
        
        return headers;
    }

    /*This function is use to get Roles from cookie. */
    getActions(): object {
        let actions         = this._cookieService.getObject('actions');
        return actions;
    }

    /*Use to add new image*/
    uploadImage(object) {

        let headers = this.getAuthorizationHeader();
        return this._http.post(this._host +'/upload', object, { headers: headers }).map((res:Response) => res.json())
    }

    // uploadCSV(object) {
    //     let headers = this.getAuthorizationHeader();
    //     return this._http.post(this._host +'/bulkUpload', object, { headers: headers }).map((res:Response) => res.json())
    // }

    // uploadProductCSV(object) {
    //     let headers = this.getAuthorizationHeader();
    //     return this._http.post(this._host +'/bulkProductUpload', object, { headers: headers }).map((res:Response) => res.json())
    // }

    /*Use to fetch all categories*/
    getAllCategories() {
          
        let headers = this.getAuthorizationHeader();
        let url = this._host + '/categoryList';
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json());
    }

    /*Use to fetch all Users*/
    getAllUsers(role, multipleroles = []) {
        let multipleRoles = '';
        if(!role && multipleroles.length) multipleRoles = JSON.stringify(multipleroles);
          
        let headers = this.getAuthorizationHeader();
        let url = this._host + '/activeuser?roles='+ role+'&multipleroles='+multipleRoles;
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json());
    }

    /*Use to soft delete any Record */
    deleteRecord( id, model ) {
        
        let headers = this.getAuthorizationHeader();
        let url = this._host + '/deleteRecord?id=' + id + '&model=' + model;
        return this._http.delete(url ,  { headers: headers }).map((res:Response) => res.json());
    }

    /*Use to get Settings */
    getSettings(){
        let headers = this.getAuthorizationHeader();
        return this._http.get(this._host +'/setting', {headers: headers}).map((res: Response) => res.json());
    }

    /*Use to soft delete any Record */
    changeStatus( id, model, status ) {
        
        let headers = this.getAuthorizationHeader();
        let url = this._host + '/changestatus?id=' + id + '&model=' + model + '&status=' + status;
        return this._http.put(url ,{},  { headers: headers }).map((res:Response) => res.json());
    }

    /*Use to convert date to date object for date picker module */
    convertDateToDateObject( date ) {
        let _date = new Date(date);
        if(_date) {
            let obj = { "date": { "year": _date.getFullYear(), "month": _date.getMonth()+1, "day": _date.getDate() }, "jsdate": date }
            return obj;
        } else {
            return {};
        }
    }

    showAlert(message,alertClass) {
        if(message == null || typeof message == 'object') message = tsMessages.SERVER_ERROR;
        this._fullLayoutService.showAlert(message,alertClass,tsConstants.ALERT_TIME);
    }

    //Use to browse back based on location history when click on back buttton.
    back() {
        this._location.back();
    }

    getSessionUser(){
        let headers = this.getAuthorizationHeader();
        return this._http.get(this._host+'/users/current', { headers: headers }).map((res:Response) => res.json())
    }

    toDateFormate(i,DATE) {
        
        let _date = DATE ? new Date(DATE) : null; 
        let date = '-';
        if(_date) {
            date = _date ? _date.getDate() + '/' + (_date.getMonth() +1) + '/' + _date.getFullYear() : '-';
        }

        return date;
    }
}