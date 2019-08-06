import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ViewUserImageComponent } from '../../modals/view-image/viewUserImage.component';
import { OptionManagementService } from '../service/option-management.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router,ActivatedRoute } from '@angular/router';
//import { ImageResult } from 'ng2-imageupload';
import { DialogService } from "ng2-bootstrap-modal";
import tsMessages  = require('../../tsmessage');
import tsConstants = require('./../../tsconstant');
import { CookieService } from 'ngx-cookie';


@Component({
  
  templateUrl: 'addupdate.component.html',
 
})
export class AddupdateComponent {

  @ViewChild('myInput')
  myInputVariable: any;
  private _host = tsConstants.HOST;

  public option = {
    status:'active',
    name:'',
    //image:''
};


    public isLoading = false;
    public isPageLoading = true;
    public optionID:any;
    public response:any;
    public districts: any;
    //public errMessage = '';


  constructor(
    private _router : Router, 
    private _cookieService: CookieService,
    private _activateRouter: ActivatedRoute, 
    private _optionService: OptionManagementService, 
    private _commanService: CommanService, 
    private changeDetectorRef: ChangeDetectorRef,
    private _dialogService: DialogService) { 
      this.optionID = _activateRouter.snapshot.params['id'];       
        if( this.optionID ) {
            this._optionService.get(this.optionID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    //console.log("option is ",res)
                    this.option = res.data.option;
                
                    this.isPageLoading = false;
                } else {
                    this._commanService.checkAccessToken(res.error);
                }
            },err => {
                this.isPageLoading = false;
            });
        } else {
            this.isPageLoading = false;
        }
    }

  // ngOnInit() {
  // }


  save(){
    //alert("hello");

    this.isLoading = true;
        let data = JSON.parse(JSON.stringify(this.option));

       // console.log("option first console value",data);
        if(this.optionID) {
            this._optionService.update(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this.response = res;
                    this._cookieService.put('optionAlert', res.data.message);
                    this._router.navigate(['/option-management/list']);
                } else {
                    this._cookieService.put('optionExistAlert',res.error.message);
                    //this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this._optionService.add(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this.response = res;
                    this._cookieService.put('optionAlert', res.data.message);
                    this._router.navigate(['/option-management/list']);
                } else {
                    this._cookieService.put('optionExistAlert',res.error.message);
                    //this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            });
            
        }


  }


//   viewImage(imageUrl) {
//     this._dialogService.addDialog(ViewUserImageComponent, {
//       imageUrl:imageUrl
//     }).subscribe((res)=>{ });
// }

// uploadImage(imageResult: ImageResult) {
//     let object = {
//         data:imageResult.dataURL,
//         type:'  '
//     }
//     this.myInputVariable.nativeElement.value = "";
//     this.isLoading = true;
//     this._commanService.uploadImage(object).subscribe( res => {
//         this.isLoading = false;
//         if(res.success) {
//             this.option['image'] = res.data.fullPath;
//         } else {
//             this._commanService.showAlert(res.error.message,'alert-danger');
//         }
//     },err => { this.isLoading = false; });
// }

trim(key) {
  if(this.option[key] && this.option[key][0] == ' ') this.option[key] = this.option[key].trim();
}


}
