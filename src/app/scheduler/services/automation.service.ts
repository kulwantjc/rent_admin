import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class AutomationService {

    private _host           = tsConstants.HOST;
  
    constructor(
        private _http: Http,
        private _commanService: CommanService ) {
    }

    /*Use to fetch all Messages*/
  	getAllList(rowsOnPage, activePage, sortTrem , search = '', key) {

        let url = this._host +'/get_allschedule?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&item='+search;
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to add new Message*/
    add(object) {
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/set_schedule', object, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to get all Users*/  
    getAllUsers(rowsOnPage, activePage, sortTrem, search = '', roles = 'DRIVER') {
        let date =  new Date().getTime().toString();
        let url = this._host +'/user?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&roles='+roles+'&search='+search+'&date='+date;

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }
    
    /*Use to get category with id*/
    get(ID) {
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/get_schedule?id='+ID, { headers: headers }).map((res:Response) => res.json())
    }

}
