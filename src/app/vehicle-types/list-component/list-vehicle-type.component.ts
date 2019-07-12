import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VehicleTypeService } from '../services/vehicle-type.service';
import { CommanService } from '../../shared/services/comman.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { CookieService } from 'ngx-cookie';

import tsMessages  = require('../../tsmessage');

@Component({
  selector: 'app-vtypes',
  templateUrl: './list-vehicle-type.component.html',
  styleUrls: ['./list-vehicle-type.component.scss']
})
export class ListVehicleTypeComponent implements OnInit {

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
        private _vehicleTypeService: VehicleTypeService,
        private _cookieService: CookieService,
        private _flashMessagesService: FlashMessagesService,
        private _commanService: CommanService ) { 

        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['category']['addEditDelete']) this.addEditDelete = true;
        
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
        this.getVtypes();        
        this.activePage = 1;
        this.getVtypes();
        
        this.itemsOnPage = this.rowsOnPage;
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    view(ID) {
       let route = '/vehicle-types/list/'+ID
       this._router.navigate([route]);       
    }

    edit(ID) {
       let route = '/vehicle-types/edit/'+ID;
        this._router.navigate([route]);       
    }

    /* Function use to remove Crop with crop id */ 
    // remove( ID ) {
    //     if(confirm("Do you want to delete?")) {
    //         this.isLoading = true;
    //         this._categoryService.delete(ID).subscribe(res => {
    //             this.response  = res;
    //             this.isLoading = false;  
    //             let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
    //             this.itemsTotal = this.itemsTotal - 1;
                
    //             if( ! (this.itemsTotal >= start) ){
    //                this.activePage = this.activePage -1
    //             }
    //             this._cookieService.put('categoryAlert', 'Deleted successfully.');
    //             /* reload page. */
    //             this.getCategory();     
    //         },err => {
    //             this.isLoading = false;
    //         });  
    //     }
    // } 

    /*Get all Users */
    getVtypes(): void {
        this._vehicleTypeService.getAllVehicleTypes( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.vtypes;
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
        this.getVtypes();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getVtypes();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getVtypes();
    }

    public search( event, element = 'category' ) {
        if( element == 'category' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getVtypes(); 
                this.activePage = 1;
                this.getVtypes(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getVtypes(); 
            this.activePage = 1;
            this.getVtypes(); 
        }
    }

    showAlert(): void {

        let alertMessage = this._cookieService.get('categoryAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-success'],
                timeout: 3000,
            });
            this._cookieService.remove('categoryAlert');
        }    
    } 
    
}
