
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');
@Injectable()
export class OptionManagementService {

  private _host = tsConstants.HOST;

  constructor(
    private _http: Http,
    private _commanService: CommanService
  ) { }


   /*Use to fetch all option*/
   getAllOption(rowsOnPage, activePage, sortTrem , search = '') {
     //console.log("data324",rowsOnPage,sortTrem,option);
    let date =  new Date().getTime().toString();  
    let url = this._host +'/alloptiontype?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search+'&date='+date;
    let headers = this._commanService.getAuthorizationHeader();
    return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
}

/*Use to add new option types*/
add(option) { 
 // console.log("jcsoftware",option);   
  let headers = this._commanService.getAuthorizationHeader();
  return this._http.post(this._host +'/optiontype/', option, { headers: headers }).map((res:Response) => res.json())
}


/*Use to get id by  option types*/
get(optionid) {
  let headers = this._commanService.getAuthorizationHeader();
  return this._http.get(this._host +'/optiontype/'+ optionid, { headers: headers }).map((res:Response) => res.json())
}

delete(optionid) {
  let headers = this._commanService.getAuthorizationHeader();
  return this._http.delete(this._host +'/optiontype/'+ optionid, { headers: headers }).map((res:Response) => res.json())
}

/*Use to update/put id by  option types*/
update(option) {
  let headers = this._commanService.getAuthorizationHeader();
  return this._http.put(this._host +'/optiontype/'+ option.id, option, { headers: headers }).map((res:Response) => res.json())
 }

}
