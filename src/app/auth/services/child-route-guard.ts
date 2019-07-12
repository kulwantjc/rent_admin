import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';


@Injectable()
export class ChildRouteGuard implements CanActivate {

    constructor(
        private _router : Router, 
        private _cookieService: CookieService ) { }

    canActivate(
        _route : ActivatedRouteSnapshot,
        _state : RouterStateSnapshot) {

        var url = _state.url
        let actions = this._cookieService.getObject('actions');

        if(actions['type'] == 'SA') {
            return true;
        } else if((url.indexOf('/dispensary') == 0) && actions['crops']['view']) {
            if(url == '/dispensary' || (url.indexOf('/dispensary/list') == 0)) {
                return true;
            } else if((url == '/dispensary/add' || (url.indexOf('/dispensary/edit') == 0)) && actions['crops']['addEditDelete']) {
                return true;
            } else {
                this.authorizationEror();
                return false;
            }
        } else if(url.indexOf('/dashboard') == 0) {
            return true;
        
        } else if(url.indexOf('/users') == 0) {
            if( url == '/users' || (url.indexOf('/users/list') == 0) ) {
                if(actions['users']['view']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            } else {
                if(actions['users']['addEditDelete']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            }
        } else if(url.indexOf('/category') == 0) {
            if( url == '/category' || (url.indexOf('/category/list') == 0) ) {
                if(actions['category']['view']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            } else {
                if(actions['category']['addEditDelete']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            }
        } else if(url.indexOf('/roles') == 0) {
            if( url == '/roles' || (url.indexOf('/roles/list') == 0) ) {
                if(actions['adminRoles']['view']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            } else {
                if(actions['adminRoles']['addEditDelete']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            }
        } else if(url.indexOf('/admin-users') == 0) {
            if( url == '/admin-users' || (url.indexOf('/admin-users/list') == 0) ) {
                if(actions['adminUsers']['view']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            } else {
                if(actions['adminUsers']['addEditDelete']) {
                    return true;
                } else {
                    this.authorizationEror();
                    return false;
                }
            }
        } else {
            this.authorizationEror();
            return false;
        }

    }

    authorizationEror() {
        alert("You are not autorized to access this page.");
    }
}