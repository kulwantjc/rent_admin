import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class SettingsService {

    private _host           = tsConstants.HOST;
  
    constructor(
        private _http: Http,
        private _commanService: CommanService ) {
    }

    /*Use to update Settings*/
    update(settings) {
        
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/setting/add', settings, { headers: headers }).map((res:Response) => res.json())
    }     

}
