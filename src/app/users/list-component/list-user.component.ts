import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommanService } from '../../shared/services/comman.service';

import tsMessages  = require('../../tsmessage');


@Component({
  selector: 'app-users',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

    public data                  = [];
    public states                = [];
    public totalRecords          = 0;
    public filterQuery           = "";
    public rowsOnPage            = 5;
    public sortBy                = "";
    public sortOrder             = "desc";
    public activePage            = 1;
    public itemsTotal            = 0;
    public searchTerm            = '';
    public sortTrem              = '';
    public selectedFilter = ''
    public itemsOnPage;  
    public active: boolean = false;
    public deactive: boolean = false;
    public state:string=''

    public response:any;
    public isLoading:boolean     = false;
    public isPageLoading:boolean = true;
    public addEditDelete:boolean = false;
    public roles                 = 'U';
    public exportData            = [];
   
    public constructor(
        private _router: Router, 
        private _userService: UserService, 
        private _commanService: CommanService ) { 
        
        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['users']['addEditDelete']) this.addEditDelete = true;
    }

    ngOnInit(): void {

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        /*set initial sort condition */
        this.sortTrem = 'createdAt' + ' ' + this.sortOrder; 

        /*Load data*/
        this.getUsers();        
        this.activePage = 1;
        this.getUsers();
        this.getStates();
        this.itemsOnPage = this.rowsOnPage;
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    viewUser (userID) {
        let route = '/users/list/' + userID;
        this._router.navigate([route]);       
    }

    editUser(userID) {     
        let route = '/users/edit/'+ userID;
        this._router.navigate([route]);       
    } 
    
    changeStatus(user) {
        let status     = '';
        let message    = tsMessages.DO_YOU_WANT_TO_ACTIVATE_USER;
        if(user.status == 'active') {
            status     = "deactive";
            message    = tsMessages.DO_YOU_WANT_TO_DEACTIVATE_USER;
        } else {
            status = "active";
        }

        if(confirm(message)) {
            this.isLoading = true;
            this._commanService.changeStatus(user.id,'users',status).subscribe(res => {
                if(res.success) {
                    this.response  = res;
                    let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
                    this.itemsTotal = this.itemsTotal - 1;
                    
                    if( ! (this.itemsTotal >= start) ){
                       this.activePage = this.activePage -1
                    }
                    this._commanService.showAlert(res.data.message,'alert-success');
                    /* reload page. */
                    this.getUsers();
                } else {
                    this.isLoading    = false;
                    this._commanService.showAlert(res.error.message,'alert-danger');
                    this._commanService.checkAccessToken(res.error);
                    this.getUsers();
                }
            },err => {
                this.isLoading = false;
            });             
        }
    }
    getStates(){
        this._userService.getStates().subscribe(
        (res)=>{
            this.states=res.data
        },(err)=>{
            this.states=[]
        }
        )
    }
    /*Get all Users */
    getUsers(): void {
        this._userService.getAllUsers( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm, this.roles,this.state,this.selectedFilter ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.users;
                this.itemsTotal    = res.data.total;
                if(res.data.users && res.data.users.length == 1) this.activePage = 1;
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
        this.getUsers();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getUsers();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getUsers();
    }

    public search( event, element = 'input' ) {
        if( element == 'input' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getUsers();
                this.activePage = 1;
                this.getUsers(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getUsers();
            this.activePage = 1;
            this.getUsers(); 
        }
    }
}