 import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CommanService } from '../../shared/services/comman.service';
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'field-officer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	public isChartLoading:boolean = true;
    public data = [];
    public isProgressStart:boolean = false;

    public lineChartType:string = 'line';

    // lineChart
    // public lineChartData:Array<any> = [
    //     {data: [10,8,9,4,8,2,10,5,10,8,9,4,8,2,10,5], label: 'Doctor'},
    //     {data: [6,8,9,4,8,2,10,8,7,8,9,4,8,2,2,5], label: 'Dispensary'},
    //     {data: [2,1,9,8,8,2,7,8,2,7,8,2,7,8,2,7,8,7], label: 'User'}
    // ];
    public lineChartData:Array<any> = [
        {data: [], fill: false, label: 'Doctor'},
        {data: [], fill: false, label: 'Dispensary'},
        {data: [], fill: false, label: 'Brand'},
        {data: [], fill: false, label: 'User'},
        {data: [], fill: false, label: 'Super Admin'},
        {data: [], fill: false, label: 'Driver'}
    ];
    public isPageLoading:boolean = true;
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {
        responsive: true,
        scales: {
        yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left'}]  /*ticks: {min: 0, max:100}*/
      }
    };

    constructor(
        private _dashboardService:DashboardService,
        private _fullLayoutService:FullLayoutService,
    	private _commanService: CommanService ) {

    }

    ngOnInit() {
          this.getMyProgress();        
    }

    getMyProgress() {


        this._dashboardService.get().subscribe(res => {
            this.isPageLoading = false;
            if(res.success) {
                this.data = res.data;
                // this.data.reverse();
                this.data.forEach((obj)=>{
                    this.isProgressStart = true;
                //     let date = new Date(obj.createdAt);
                //     let month = date.getMonth()+1;
                //     let label = month + '/' + date.getDate() + '/' + date.getFullYear();
                    this.lineChartLabels.push(obj._id);
                    obj.roles.forEach((record)=>{
                        if(record.role == 'DR') {
                            this.lineChartData[0].data.push(record.count);
                        } else if(record.role == 'D') {
                            this.lineChartData[1].data.push(record.count);
                        } else if(record.role == 'B') {
                            this.lineChartData[2].data.push(record.count);
                        } else if(record.role == 'U') {
                            this.lineChartData[3].data.push(record.count);
                        } else if(record.role == 'SA') {
                            this.lineChartData[4].data.push(record.count);
                        } else if(record.role == 'DRIVER') {
                            this.lineChartData[5].data.push(record.count);
                        }
                    })
                })
                this.isChartLoading = false;
            } else {
                this.isChartLoading = false;
            }
        },err => {
            this.isPageLoading = false;
            this.isChartLoading = false;
        });             
    }

    chartClicked(event) {

    }
}
