import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import tsConstants = require('./../../tsconstant');
import tsMessages  = require('../../tsmessage');


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService,CommanService]
})
export class LoginComponent implements OnInit {
    
    public user = {
        grant_type : tsConstants.GRANT_TYPE,
        client_id  : tsConstants.CLIENT_ID,
        username:'',
        password:''
    };

    public errMessage            = '';
    public isPageLoading:boolean = false;
    public rememberMe            = true;
    private _session             = false;

    constructor(
        private _router : Router,
        private _loginService: LoginService,
        private _commanService: CommanService,
        private _cookieService: CookieService,
        private _activateRouter: ActivatedRoute ) { 
        this._session = _activateRouter.snapshot.params['data'];
        if(this._session) {
            this.errMessage = tsMessages.YOUR_SESSION_HAS_EXPIRED_PLEASE_LOGIN_AGAIN;
        }
    }

    ngOnInit() {
        if(localStorage.getItem("remember")) {
            this.user["username"] = localStorage.getItem("remember");
        }
    }

  	login() {
        
        this.isPageLoading     = true;
        this.errMessage        = '';        

		this._loginService.login(this.user).subscribe(res => {

            let token          = res.access_token;
            this.setValue(res);

            let actions;
            if( res.role_id && res.role_id['permission'] ) {

                actions         = res.role_id['permission'];
                actions['type'] = res.roles;
                this.routeNavigate(token,actions);

            } else if(res.roles == 'SA') {
                
                actions = {
                    type:res.roles
                };
                this.routeNavigate(token,actions);        

            } else {
                this.isPageLoading = false;
                this.errMessage = tsMessages.YOU_ARE_NOT_AUTHORIZED_PLEASE_CONTACT_MARKET_ADMIN;
            }

        },err => {       
            this.isPageLoading  = false;
            this.errMessage     = tsMessages.EMAIL_OR_PASSWORD_IS_NOT_CORRECT;
        });

	}

    setValue(res) {
        let mObj = {
            markets:[],
            selectedMarket: {
                name : 'All',
                pincode:[]
            }
        };
        this._cookieService.putObject('markets', mObj );   
    }

    routeNavigate(token, actions) {
        /* Setup Cookie */
        this._cookieService.put('token', token );
        this._cookieService.putObject('actions', actions );
        if(this.rememberMe) {
            localStorage.setItem("remember",this.user["username"]);
        } else {
             localStorage.removeItem('remember');
        }
        if(!this._session) {
            let route = '/dashboard';
            this._router.navigate([route]);
        } else {
            this._commanService.back();
        }
    }
}
