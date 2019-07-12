import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class VehicleTypeService {
  
    private _host = tsConstants.HOST;
    
    constructor(
        private _http: Http,
        private _commanService: CommanService ) { 
    }

    /*Use to get all vehicle types*/  
    getAllVehicleTypes(rowsOnPage, activePage, sortTrem, search = '', roles = 'A') {
        let date =  new Date().getTime().toString();
  		let url = this._host +'/allvehicletype?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search+'&date='+date;

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }

     
    /*Use to add new vehicle types*/
    add(vtypes) {
        
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.post(this._host +'/vehicletype', vtypes, { headers: headers }).map((res:Response) => res.json())
    }

    /*User to get vehicle type detail with ID*/
    get(vid) {
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host +'/vehicletype/'+ vid, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to update vehicle type detail with their ID*/
    update(vtypes) {

        let headers = this._commanService.getAuthorizationHeader();
        return this._http.put(this._host +'/vehicletype/'+ vtypes.id, vtypes, { headers: headers }).map((res:Response) => res.json())
    }

    allVehicleTypes(){
        let headers = this._commanService.getAuthorizationHeader();
        return this._http.get(this._host+'/listvehicletype', { headers: headers }).map((res:Response) => res.json())
    }
}