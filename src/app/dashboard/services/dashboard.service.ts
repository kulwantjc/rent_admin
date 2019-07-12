import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class DashboardService {

    private _host           = tsConstants.HOST;

    constructor(
        private _http: Http,
        private _commanService: CommanService ) {
    }

    get() {
        
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/dashboard', { headers: headers }).map((res:Response) => res.json())
    }

}