import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()

export class ProfileService {
    
    private _host = tsConstants.HOST;
    private _accessToken = '';

    constructor(
        private _http: Http,
        private _commanService: CommanService ) { 
    }
 	

    getcurrentuser(){
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host+'/users/current', { headers: headers }).map((res:Response) => res.json())
    }

    changePassword(userData) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.put(this._host +'/changepassword', userData, { headers: headers }).map((res:Response) => res.json())
    }
}