import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AutomationService } from '../services/automation.service';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  templateUrl: 'view.component.html',
  providers: [AutomationService]
})
export class ViewComponent {

	public ID                  = '';
	public category            = {type:'' };
    public isLoading:boolean   = true;
    public addEditDelete:boolean   = false;
    public object:any;

    constructor(
        private _router: Router, 
        private _activatedRouter: ActivatedRoute,  
        private _automationService: AutomationService,
        private _cookieService: CookieService,
        private _commanService: CommanService ) {

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['category']['addEditDelete']) this.addEditDelete = true;

  	    this.ID =  _activatedRouter.snapshot.params['id'];
  	    this.fetch();
         
    }

    fetch() {

        this._automationService.get(this.ID).subscribe(res => {
            this.isLoading = false;
            if(res.success) {
                let data = res.data[0];
                this.object = data;
            } else {
                this._commanService.checkAccessToken(res.error);
                this._commanService.showAlert(res.error.message,'alert-danger');
            }
        },err => {
            this.isLoading = false;
        });
    }

   edit( ID ) {        
        let route = '/scheduler/edit/'+ID;
        this._router.navigate([route]);       
    }   
   

}