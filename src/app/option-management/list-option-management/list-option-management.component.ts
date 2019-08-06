import { Component, OnInit } from '@angular/core';
import { OptionManagementService } from '../service/option-management.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  selector: 'app-list-option-management',
  templateUrl: './list-option-management.component.html',
 
})
export class ListOptionManagementComponent implements OnInit {

    public data                  = [];
    public totalRecords          = 0;
    public filterQuery           = "";
    public rowsOnPage            = 5;
    public sortBy                = "createdAt";
    public sortOrder             = "desc";
    public activePage            = 1;
    public itemsTotal            = 0;
    public searchTerm            = '';
    public sortTrem              = '';

    public itemsOnPage;    
    
    public response:any;
    public isLoading:boolean     = false;
    public isPageLoading:boolean = true;
    public addEditDelete:boolean = false;

    public constructor(
     
      private _router: Router, 
      private _optionService: OptionManagementService,  
      private _cookieService: CookieService,
      private _commanService: CommanService 
    ) { }

  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

 /*set initial sort condition */
 this.sortTrem = this.sortBy + ' ' + this.sortOrder;         

 /*Load data*/
 this.getOption();        
 this.activePage = 1;
 //this.getOption();   

 this.itemsOnPage = this.rowsOnPage;

  }

  public toInt(num: string) {
    return +num;
}

public sortByWordLength = (a: any) => {
    return a.city.length;
}

viewOption(optionid) {
    let route = '/optiontype/list/' + optionid;
    this._router.navigate([route]);       
}

editOption(optionid) {     
    let route = '/optiontype/edit/'+optionid;
    this._router.navigate([route]);       
}

// function removeRole option value
removeOption(optionid) { 
  if(confirm("Do you want to delete?")) {
      this.isLoading = true;
      this._optionService.delete(optionid).subscribe(res => {
          if(res.success) {
              this.response  = res;
              let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
              this.itemsTotal = this.itemsTotal - 1;
              
              if( ! (this.itemsTotal >= start) ){
                 this.activePage = this.activePage -1
              }
              this._commanService.showAlert(res.data.message,'alert-success');
              /* reload page. */
              this.getOption();
          } else {
              this.isLoading = false;
              this._commanService.showAlert(res.error.message,'alert-danger');
          }
      },err => {
          this.isLoading = false;
      });             
  }
} 
 /*Get all option*/
 getOption(): void {
   console.log('listkulwant',this.data);   
  this._optionService.getAllOption(this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm).subscribe(res => {
      this.isLoading     = false;
      this.isPageLoading = false;

      if(res.success) {
         console.log('resssss',res.data);
          this.data          = res.data.data;
          this.itemsTotal    = res.data.total;
      } else {
          this._commanService.checkAccessToken(res.error);   
      }
  },err => {
      this.isLoading     = false;
      this.isPageLoading = false;
 });
}

public onPageChange(event) {
  this.isLoading     = true;
  this.rowsOnPage = event.rowsOnPage;
  this.activePage = event.activePage;
  this.getOption();
}

public onRowsChange( event ): void {
  this.isLoading  = true;
  this.rowsOnPage = this.itemsOnPage;
  this.activePage = 1;
  this.getOption();      
}

public onSortOrder(event) {
  this.sortTrem = this.sortBy+' '+this.sortOrder;
  this.isLoading  = true; 
  this.getOption();
}

public search( event, element = 'input' ) {
  if( element == 'input' ) {
      if(event.keyCode == 13 || this.searchTerm == '') {
          this.searchTerm = this.searchTerm.trim();
          this.isLoading  = true;
          this.getOption(); 
          this.activePage = 1;
          this.getOption(); 
      }
  }else{
      this.searchTerm = this.searchTerm.trim();
      this.isLoading  = true;
      this.getOption(); 
      this.activePage = 1;
      this.getOption(); 
  }
}

}
