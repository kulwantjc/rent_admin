import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Http, Response, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import tsConstants = require('./../tsconstant');
@Injectable()
export class FullLayoutService {
    
    private _host = tsConstants.HOST;
    private socket;
    public markets:BehaviorSubject<object> = new BehaviorSubject<object>({});
    constructor(
        private _http: Http,
        private _cookieService: CookieService,  
        private _flashMessagesService: FlashMessagesService ) { 
    }

    showAlert(message,alertClass,alertTime) {
        window.scrollTo(0, 0);
        let obj = {
            classes: ['alert', alertClass],
            timeout: alertTime
        }
        this._flashMessagesService.show( message, obj);
    }

    setMarket(marketObj) {
        if(marketObj) {
            this.markets.next(marketObj);
        } else {
            let marketObj = this._cookieService.getObject('markets');
            this.markets.next(marketObj);
        }
    }

    sendMessage(message){
        this.socket.emit('add-message', message);    
    }
  
    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this._host);
            this.socket.on('notification', (data) => {
                let obj = {
                    data:data,
                    key:'notification'
                }
                observer.next(obj);    
            });
            this.socket.on('general_notification', (data) => {
                let obj = {
                    data:data,
                    key:'general_notification'
                }
                observer.next(obj);    
            });
            return () => {
                this.socket.disconnect();
          };  
        })    
        return observable;
    }

    getUnreadMessagesCount() {
        let headers = this.getAuthorizationHeader();
        return this._http.get(this._host + '/message/unreadcount', { headers: headers }).map((res:Response) => res.json())
    }

    getUnreadNotificationCount() {
        let headers = this.getAuthorizationHeader();
        return this._http.get(this._host + '/notifications/unreadcount', { headers: headers }).map((res:Response) => res.json())
    }

    /*This function is use to get header with Authorization or without Authorization. */
    getAuthorizationHeader( access = true) {
        let headers = new Headers();
        
        if( access ) {
            let token   = this.getAccessToken();
            headers.append('Authorization',token);
        }
        
        return headers;
    }

    /*This function is use to get access token from cookie. */
    getAccessToken(): string {
        let token           = this._cookieService.get('token');
        return 'Bearer ' + token;
    }
}
