import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  selector: 'app-roles',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {

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
        private _roleService: RoleService, 
        private _cookieService: CookieService,
        private _commanService: CommanService ) { 
        
        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['adminRoles']['addEditDelete']) this.addEditDelete = true;
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
        this.getRoles();        
        this.activePage = 1;
        this.getRoles();   

        this.itemsOnPage = this.rowsOnPage;
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    viewRole(roleID) {
        let route = '/roles/list/' + roleID;
        this._router.navigate([route]);       
    }

    editRole(roleID) {     
        let route = '/roles/edit/'+roleID;
        this._router.navigate([route]);       
    }

     /* Function use to remove role with role id*/
    removeRole(roleID) { 
        if(confirm("Do you want to delete?")) {
            this.isLoading = true;
            this._roleService.delete(roleID).subscribe(res => {
                if(res.success) {
                    this.response  = res;
                    let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
                    this.itemsTotal = this.itemsTotal - 1;
                    
                    if( ! (this.itemsTotal >= start) ){
                       this.activePage = this.activePage -1
                    }
                    this._commanService.showAlert(res.data.message,'alert-success');
                    /* reload page. */
                    this.getRoles();
                } else {
                    this.isLoading = false;
                    this._commanService.showAlert(res.error.message,'alert-danger');
                }
            },err => {
                this.isLoading = false;
            });             
        }
    } 

    /*Get all Crops*/
    getRoles(): void {   
        this._roleService.getAllRoles( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.roles;
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
        this.getRoles();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getRoles();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getRoles();
    }

    public search( event, element = 'input' ) {
        if( element == 'input' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getRoles(); 
                this.activePage = 1;
                this.getRoles(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getRoles(); 
            this.activePage = 1;
            this.getRoles(); 
        }
    }
}
