import { Component, ChangeDetectorRef } from '@angular/core';
import { TestManagementService} from '../services/test-management.service';
import { CommanService } from '../../shared/services/comman.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import tsMessages  = require('../../tsmessage');
import tsConstants = require('./../../tsconstant');
import { CookieService } from 'ngx-cookie';
import { ImageUploadModule } from 'ng2-imageupload';

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
  
    constructor(public src: string, public file: File) {}
  }

 @Component({
  selector: 'app-addupdate',
  templateUrl: 'addupdate.component.html',
 
})
export class AddupdateComponent {
    selectedFile: ImageSnippet;
    myInputVariable: any;
  private _host = tsConstants.HOST;
  
  public test = {
    status:'active',
    firstname:'',
    lastname:'',
    gender:'',
   
};

private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
   
    public isLoading = false;
    public isPageLoading = true;
    public testID:any;
    public form:any;
    public response:any;
    public districts: any;
    //public errMessage = '';
  constructor(
    private _router : Router, 
    private _cookieService: CookieService,
    private _activateRouter: ActivatedRoute, 
    private _testService: TestManagementService, 
    private _commanService: CommanService, 
    private changeDetectorRef: ChangeDetectorRef,
    private _dialogService: DialogService) { 
      this.testID = _activateRouter.snapshot.params['id'];       
        if( this.testID ) {
            this._testService.get(this.testID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    console.log("option is ",res)
                    this.test = res.data;
                
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
        let data = JSON.parse(JSON.stringify(this.test));

       //console.log("test first console value",data);
        if(this.testID) {
          //  console.log("gurpreet",this.testID);
            this._testService.update(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this.response = res;
                    this._cookieService.put('testAlert', res.data.message);
                    this._router.navigate(['/test-management/list']);
                } else {
                    this._cookieService.put('testExistAlert',res.error.message);
                    //this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            })
        } else {
            this._testService.add(data).subscribe(res => {
                this.isLoading = false;
                if(res.success) {
                    this.response = res;
                    this._cookieService.put('testAlert', res.data.message);
                    this._router.navigate(['/test-management/list']);
                } else {
                    this._cookieService.put('testExistAlert',res.error.message);
                    //this.showDangerAlert();
                }
            },err => {
                this.isLoading = false;
            });
            
        }
  }

/////image upload code  kulwant 23-7-2019
processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
       
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log("file testing image",file);
      this.selectedFile.pending = true;
     
      this._testService.uploadImagess(this.selectedFile.file).subscribe(
        (res) => {
          console.log("response",res)
          this.onSuccess();
        },
        (err) => {
          console.log("resssss",err)
          this.onError();
          //console.log("onError",this.onError);
        }
        
        )
       // console.log("request and responce");
    });

    reader.readAsDataURL(file);
  }
  

trim(key) {
  if(this.test[key] && this.test[key][0] == ' ') this.test[key] = this.test[key].trim();
}



}
