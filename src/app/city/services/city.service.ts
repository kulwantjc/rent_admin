import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class CityService {

    private _host           = tsConstants.HOST;
  
    constructor(
        private _http: Http,
        private _commanService: CommanService ) {
    }

    /*Use to fetch all Inputs*/
  	getAllCity(rowsOnPage, activePage, sortTrem , search = '') {
        let date =  new Date().getTime().toString();
  		let url = this._host +'/getallcities?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search+'&date='+date;

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to add new City*/
    add(city) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/city', city, { headers: headers }).map((res:Response) => res.json())
    }
    
    /*Use to get city with id*/
    get(ID) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/city/'+ ID, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to update city*/
    update(city) {
        console.log("city",this._host)
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.put(this._host +'/city/'+ city.id, city, { headers: headers }).map((res:Response) => res.json())
    }


    /*Use to Delete city with city id */
    delete( Id ) {
        
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.delete(this._host +'/city/'+ Id,  { headers: headers }).map((res:Response) => res.json());
    }      

}
