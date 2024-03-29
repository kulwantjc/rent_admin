import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');
@Injectable()
export class UserService {
  
    private _host = tsConstants.HOST;
    
    constructor(
        private _http: Http,
        private _commanService: CommanService ) { 
    }

    /*Use to get all Users*/  
    getAllUsers(rowsOnPage, activePage, sortTrem, search = '', roles = 'U',state='',status='') {
        let date =  new Date().getTime().toString();
        let url = this._host +'/user?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&roles='+roles+'&search='+search+'&date='+date+'&state='+state+'&status='+status;

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }
     
    /*Use to add new user*/
    add(user) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/user', user, { headers: headers }).map((res:Response) => res.json())
    }

    /*User to get user detail with ID*/
    get(userid) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/user/'+ userid, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to update user detail with there ID*/
    update(user) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.put(this._host +'/user/'+ user.id, user, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to fetch all States*/
    getStates() {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/states?sort=stateName', { headers: headers }).map((res:Response) => res.json())
    }

   
    
}
