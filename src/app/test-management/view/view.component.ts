import { Component,  } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';
import {Router, ActivatedRoute} from '@angular/router';
import { TestManagementService} from '../services/test-management.service'


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
 
})

export class ViewComponent {

	private testID          = '';
	private test            = {};
    public isLoading       = true;
    private addEditDelete   = false;
    constructor(
        private _router: Router, 
        private _route: ActivatedRoute,
        private _testService: TestManagementService, 
        private _cookieService: CookieService,
        private _commanService: CommanService ) { 

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['adminRoles']['addEditDelete']) this.addEditDelete = true;

      	this.testID = _route.snapshot.params['id'];
  	    this._testService.get(this.testID).subscribe(res => {
            this.isLoading = false;
            if(res.success) {
                this.test = res.data;
            } else {
                this._commanService.checkAccessToken(res.error);
            }
        },err => {
            this.isLoading = false;
        });
    }

    

    editTest(testid) {
      console.log("edittest value",testid);
    let route = '/test-management/edit/'+testid;
    this._router.navigate([route]);       
}

}
