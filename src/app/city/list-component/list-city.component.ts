import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CityService } from '../services/city.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages'

@Component({
  selector: 'app-city',
  templateUrl: './list-city.component.html'
})
export class ListCityComponent implements OnInit {

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
        private _cityService: CityService,
        private _cookieService: CookieService,
        private _flashMessagesService: FlashMessagesService,
        private _commanService: CommanService ) { 

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['city']['addEditDelete']) this.addEditDelete = true;
        
    }

    ngOnInit(): void {

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        /*set initial sort condition */
        this.sortTrem = this.sortBy + ' ' + this.sortOrder; 
          
        /*Load data*/
        this.getCity();        
        this.activePage = 1;
        this.getCity();
        
        this.itemsOnPage = this.rowsOnPage;
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    remove( ID ) {
        if(confirm("Do you want to delete?")) {
            this.isLoading = true;
            this._cityService.delete(ID).subscribe(res => {
                if(res.success) {
                    let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
                    this.itemsTotal = this.itemsTotal - 1;
                    
                    if( ! (this.itemsTotal >= start) ){
                       this.activePage = this.activePage -1;
                       if(this.activePage == 0) this.activePage = 1;
                    }
                    /* reload page data */
                    this.getCity();
                    this._commanService.showAlert(res.data.message,'alert-success');
                } else {
                    this.isLoading = false;
                    this._commanService.showAlert(res.error.message,'alert-danger');
                }
            },err => {
                this.isLoading = false;
            });             
        }
    }

    edit(ID) {
       let route = '/city/edit/'+ID;
        this._router.navigate([route]);       
    }

   	/*Get all City */
    getCity(): void {
        this._cityService.getAllCity( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.city;
                this.itemsTotal    = res.data.total;
                this.showAlert();
            } else {
                this._commanService.checkAccessToken(res.error);
            }
        },err => {
            this.isLoading     = false;
            this.isPageLoading = false;
            this._commanService.checkAccessToken(err);
       });             
    }    

    public onPageChange(event) {
        this.isLoading     = true;
        this.rowsOnPage = event.rowsOnPage;
        this.activePage = event.activePage;
        this.getCity();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getCity();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getCity();
    }

    public search( event, element = 'city' ) {
        if( element == 'city' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getCity(); 
                this.activePage = 1;
                this.getCity(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getCity(); 
            this.activePage = 1;
            this.getCity(); 
        }
    }

    showAlert(): void {

        let alertMessage = this._cookieService.get('cityAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-success'],
                timeout: 3000,
            });
            this._cookieService.remove('cityAlert');
        }    
    } 

}
