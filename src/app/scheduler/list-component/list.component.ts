import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AutomationService } from '../services/automation.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FlashMessagesService } from 'ngx-flash-messages';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

declare let jsPDF; 

@Component({
  selector: 'automation',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    public data                  = [];
    public totalRecords          = 0;
    public filterQuery           = "";
    public rowsOnPage            = 1000000;
    public sortBy                = "createdAt";
    public sortOrder             = "desc";
    public activePage            = 1;
    public itemsTotal            = 0;
    public searchTerm            = '';
    public sortTrem              = '';

    public itemsOnPage;    

    public response:any;
    public selectedFilter        = '';
    public isLoading:boolean     = false;
    public isPageLoading:boolean = true;
    public addEditDelete:boolean = false;
    public events                = [];

    public constructor(
        private _router: Router,
        private _automationService: AutomationService,
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

        /*set initial sort condition*/
        this.sortTrem = this.sortBy + ' ' + this.sortOrder; 
          
        /*Load data*/
        this.getList();        
        this.activePage = 1;
        this.getList();
        
        this.itemsOnPage = this.rowsOnPage;
        

              // [
              //   {
              //       title: 'driver1@yopmail.com',
              //       start: '2019-02-02'
              //   },
              //   {
              //       title: 'driver2@yopmail.com',
              //       start: '2019-02-05',
              //       end: '2019-02-08',
              //       id:"testing ID"
              //   }]
          
    }

    eventClick(event) {
        this.view(event.event.id);
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    view(ID) {
       let route = '/scheduler/list/'+ID
       this._router.navigate([route]);       
    }

    edit(ID,key) {
       let route = '/scheduler/edit/'+ID;
       if(key != 'edit') var query = {type:'replacement'}
        this._router.navigate([route],{queryParams:query});       
    }

    
    /*Get all messages*/
    getList(): void {   
        this._automationService.getAllList( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm, this.selectedFilter ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data;
                this.events        = [];
                this.data.forEach((obj)=>{
                    obj['title'] = obj['driver_id']['username1'];
                    obj['start'] = new Date(obj['schedule_date']);
                    if(obj['schedule_time_from'].indexOf('AM') >= 0) {
                        var time = obj['schedule_time_from'].split(':');
                        var v1 = time[0];
                        time = time[1].split('AM');
                        var v2 = time[0];
                    obj['start'].setHours(v1,v2,0,0);
                    }
                    // obj['minTime'] = "06:10:10"
                    // obj['maxTime'] = "08:08:10"
                    this.events.push(obj);
                })
                this.itemsTotal    = res.total;
                this.calendarOptions = {
                    editable: false,
                    eventLimit: false,
                    header: {
                      left: 'prev,next today',
                      center: 'title',
                      right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    events: this.events
                  };
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
        this.getList();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getList();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getList();
    }

    public search( event, element = 'automatiion' ) {
        if( element == 'automatiion' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getList(); 
                this.activePage = 1;
                this.getList(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getList(); 
            this.activePage = 1;
            this.getList(); 
        }
    }

}
