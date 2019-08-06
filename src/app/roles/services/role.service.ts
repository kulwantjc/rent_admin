import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class RoleService {

    private _host = tsConstants.HOST;

    constructor(
        private _http: Http,
        private _commanService: CommanService ) { 
    }

    /*Use to fetch all roles*/
  	getAllRoles(rowsOnPage, activePage, sortTrem , search = '') {
        let date =  new Date().getTime().toString();  
        let url = this._host +'/permission?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search+'&date='+date;

        let headers = this._commanService.getAuthorizationHeader();
		return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to add new role*/
    add(role) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/permission', role, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to get role with role id*/
    get(roleID) {
        
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/permission/'+ roleID, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to update role*/
    update(role) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.put(this._host +'/permission/'+ role.id, role, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to delete role*/
    delete(roleID) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.delete(this._host +'/permission/'+ roleID, { headers: headers }).map((res:Response) => res.json())
    }

    allRolesTypes(){
        //console.log("in role serviec");
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host+'/listrolestype', { headers: headers })
        .map((res:Response) => res.json())
   }
}