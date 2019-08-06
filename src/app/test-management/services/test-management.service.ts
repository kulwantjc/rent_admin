import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommanService } from '../../shared/services/comman.service';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class TestManagementService {

  private _host = tsConstants.HOST;
  constructor(
    private _http: Http,
    private _commanService: CommanService
  ) { }


  getAllTest(rowsOnPage, activePage, sortTrem , search = '') {
    //console.log("test list get",rowsOnPage,sortTrem,);
   let date =  new Date().getTime().toString();  
   let url = this._host +'/alltesttype?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search+'&date='+date;
   let headers = this._commanService.getAuthorizationHeader();
   return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
}

add(test) { 
  // console.log("testmanagement",test);   
   let headers = this._commanService.getAuthorizationHeader();
   return this._http.post(this._host +'/testmanagement/', test, { headers: headers }).map((res:Response) => res.json())
 }
 
 
 /*Use to get id by  test types*/
 get(testid) {
   let headers = this._commanService.getAuthorizationHeader();
   return this._http.get(this._host +'/testmanagement/'+ testid, { headers: headers }).map((res:Response) => res.json())
 }
 
  /*Use to delete id by  test types*/
 delete(testid) {
   let headers = this._commanService.getAuthorizationHeader();
   return this._http.delete(this._host +'/testmanagement/'+ testid, { headers: headers }).map((res:Response) => res.json())
 }
 
 /*Use to update/put id by  test types*/
 update(test) {
   console.log("update value",test);
   let headers = this._commanService.getAuthorizationHeader();
   return this._http.put(this._host +'/testmanagement/'+ test.id, test, { headers: headers }).map((res:Response) => res.json())
  }

  /// kulwant singh code image upload 23-7-2019
  uploadImagess(object) {
    console.log("function hello uploadImagefile",object);
    let headers = this._commanService.getAuthorizationHeader();
    return this._http.post(this._host +'/uploads', object, { headers: headers }).map((res:Response) => res.json())
  }
}