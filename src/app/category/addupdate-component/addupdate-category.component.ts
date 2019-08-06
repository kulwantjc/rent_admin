import { Component, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { VehicleTypeService } from '../../vehicle-types/services/vehicle-type.service';

import tsMessages  = require('../../tsmessage');

@Component({
  templateUrl: 'addupdate-category.component.html'
})
export class AddUpdateCategoryComponent {
    public category     = {
        name:'',
        type:''
    };

    public isLoading       = false;
    public isPageLoading   = true;
    public categoryID: any;
    public oBj = {vname: ''};
    public response:any;
    public type = [];
    public errMessage = '';
    public ParentCategories = [];
    


    constructor(
        private _router : Router,
        private _activateRouter: ActivatedRoute, 
        private _catgService: CategoryService, 
        private _flashMessagesService: FlashMessagesService, 
        private _cookieService: CookieService,
        private _commanService: CommanService,
        private _vehicleTypeService: VehicleTypeService,
        private changeDetectorRef: ChangeDetectorRef ) {

        this.categoryID = _activateRouter.snapshot.params['id'];        

        if( this.categoryID ) {
            this._catgService.get(this.categoryID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    this.category = res.data;
                    if(this.category['parentId']) {
                        this.category['parentId'] = this.category['parentId']['id'];
                    } else {
                        this.category['parentId'] = '';
                    }
                   } else {
                    this._commanService.checkAccessToken(res.error);
                }
            }, err => {
                this.isPageLoading = false;
                this._commanService.checkAccessToken(err);
            });
        } else {
            this.isPageLoading = false;
        }

        this.allVehicleTypes()
    }

      ngOnInit(): void {

          this.showDangerAlert();
      }

    /*If categoryID exist then will update existing category otherwise will add new category*/
    save() {

        this.isLoading = true;
        let data = JSON.parse(JSON.stringify(this.category));
        if(data.parentId == '' || !data.parentId) {
            data.parentId = null;
            data.variety = [];
        } else {
        }
        if(this.categoryID) {
            this._catgService.update(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res;
                    this._cookieService.put('categoryAlert', res.data.message);
                    this._router.navigate(['/category/list']);
                } else {
                    this._cookieService.put('categoryExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this._catgService.add(data).subscribe(res => {
                this.isLoading         = false;
                if(res.success) {
                    this.response          = res;
                    this._cookieService.put('categoryAlert', res.data.message);
                    this._router.navigate(['/category/list']);
                } else {
                    this._cookieService.put('categoryExistAlert',res.error.message);
                    this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            });
            
        }
    }

    allVehicleTypes() {
        this._vehicleTypeService.allVehicleTypes().subscribe(res => {
            console.log("res of vehicle type",res)
            
            if(res.success) {
                let data = res.data.data
               // console.log("cond=firm",data);
                for (var i = 0; i < data.length; ++i) {
                    // code...
                this.type.push(data[i].name);
                }
            } else {
                this._commanService.checkAccessToken(res.error);
                this._commanService.showAlert(res.error.message,'alert-danger');
            }
        },err => {
            this.isLoading = false;
        });
    }

    showDangerAlert(): void {

        let alertMessage = this._cookieService.get('categoryExistAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
            this._cookieService.remove('categoryExistAlert');
        }    
    }

    trim(key) {
        if(this.category[key] && this.category[key][0] == ' ') this.category[key] = this.category[key].trim();
    }
    
}
