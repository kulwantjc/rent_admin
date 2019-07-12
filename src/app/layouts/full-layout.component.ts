import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommanService } from '../shared/services/comman.service';
import { FullLayoutService } from './full-layout.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers:[CommanService]
})

export class FullLayoutComponent implements OnInit {

    public disabled: boolean           = false;
    // public status: {isopen: boolean}   = {isopen: false};
    
        
    public active;
    public access = {
        users:false,
        category:false,
        roles:false,
        adminUsers:false,
        staticPages:false,
        settings:false,
        scheduler:false,
        vehicleTypes:false
    }
    public connection;
    public notifications  = [];
    public messages:any;
    public notificationCount:any
    public myID           = '';
    public chatID         = '';
    public adminType      = '';
    public defaultDashboard = '/dashboard';
    public acessDashboard   = [];

    constructor(
        private _router : Router, 
        private _activateRouter: ActivatedRoute, 
        private _cookieService: CookieService,
        private _commanService: CommanService,
        private _fullLayoutService:FullLayoutService ) { 

        this._fullLayoutService.setMarket(null);
        
        this.active = this._activateRouter.snapshot["_urlSegment"].segments[0].path;
        let actions = this._commanService.getActions();

        this.adminType = actions["type"];
        if(actions["type"] == 'SA') {
            for (var key in this.access) {
              if (this.access.hasOwnProperty(key)) {
                this.access[key] = true;
              }
            }
        } else {
            this.access = {
                users:actions['users'].view,
                category:actions['category'].view,
                roles:actions['adminRoles'].view,
                adminUsers:actions['adminUsers'].view,
                staticPages:actions['staticPages'].view,
                settings:false,
                scheduler:false,
                vehicleTypes:false
            }
        }

    }

    public toggled(open: boolean): void {
      // console.log('Dropdown is now: ', open);
    }

    ngOnInit(): void {
        /*this._fullLayoutService.markets.subscribe(res => {
          this.marketObj['markets'] = res['markets'];
          this.marketObj['selectedMarket'] = res['selectedMarket'];
        });*/
        this._commanService.getSessionUser().subscribe(res => {
           if(res) {
               this.myID = res.id;
           }
        });
    }

    layout(key) {
        let keyArray = key.split('-');
        let flag = keyArray.length > 1 ? keyArray[0] + keyArray[1].substring(0,1).toUpperCase() + keyArray[1].substring(1) : keyArray[0];
        if(this.access[flag]) this.applyRouter(key);
    }

    applyRouter(key) {
       this.active = key;
       let route = '/' + key + '/list';
       this._router.navigate([route]);
    }

    logout() {
        this._cookieService.removeAll();
        this._router.navigate(['/login']);
    }

}
