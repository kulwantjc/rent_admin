import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import tsConstants = require('./../../tsconstant');

@Component({
	selector: 'progress-bar',
	templateUrl: './progress-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
	
	public _dateFormat    = tsConstants.DATE_FORMAT;

	@Input() title:string;
	@Input() status:string;
	@Input() bid:object;

	public states = [ 'Pending', 'Accepted', 'UpfrontPaid', 'BalancePaid', 'logisticPaid', 'Delivered', 'Withdrawal', 'Rejected', 'Refund', 'farmerAccepted', 'farmerUpfrontPaid', 'farmerBalancePaid' ];
	public items = [
		{title:"Pending", value: "Pending", class:"disabled", dateKey: "createdAt", dateValue: "" , bgClass: "" },
		{title:"Accepted",  value: "Accepted", class:"disabled", dateKey: "acceptedAt", dateValue: "", bgClass: "" },
		{title:"Upfront paid",  value: "UpfrontPaid", class:"disabled", dateKey: "upfrontProcessedDate", dateValue: "", bgClass: "" },
		{title:"Balance Payment",  value: "BalancePaid", class:"disabled", dateKey: "balanceProcessedDate", dateValue: "", bgClass: "" },
		{title:"Logistic Payment",  value: "logisticPaid", class:"disabled", dateKey: "logisticProcessedDate", dateValue: "", bgClass: "" },
		{title:"Delivered",  value: "Delivered", class:"disabled", dateKey: "deliveredAt", dateValue: "", bgClass: "" },
		{title:"Rejected",  value: "Rejected", class:"disabled", dateKey: "rejectedAt", dateValue: "", bgClass: "bg-danger" },
		{title:"Refund",  value: "Refund", class:"disabled", dateKey: "refundDate", dateValue: "", bgClass: "" },
		{title:"Withdrawal",  value: "Withdrawal", class:"disabled", dateKey: "refundDate", dateValue: "", bgClass: "bg-danger" },
		{title:"Accepted",  value: "farmerAccepted", class:"disabled", dateKey: "acceptedAt", dateValue: "", bgClass: "" },
		{title:"Upfront Paid",  value: "farmerUpfrontPaid", class:"disabled", dateKey: "farmerUpfrontProcessedDate", dateValue: "", bgClass: "" },
		{title:"Balance Payment",  value: "farmerBalancePaid", class:"disabled", dateKey: "farmerBalanceProcessedDate", dateValue: "", bgClass: "" },
	];
	
	constructor() { }

	ngOnInit() {

		this.setDates();

		for (let i = 0; i < this.states.length; i++) {
			if( this.items[i].value == this.status ){
		  		this.items[i].class = "active";
		  		break;
			}else{
				this.items[i].class = "complete";
			}
		}
		if(this.title == "Bidder") {
			if( ( (this.status !== 'Rejected') && (this.status !== 'Refund') && (this.status !== 'Withdrawal') ) ) {
				this.items.splice(6,6);
				if(this.bid['logisticsOption'] == 'self') this.items.splice(4,1);
			} else {
				this.items[0]['bgClass'] = "bg-danger";
				if(this.status == 'Withdrawal') {
					this.items.splice(1,7);
					this.items.splice(2,3);	
				} else if(this.status == 'Rejected' || this.status == 'Refund') {
					this.items.splice(1,5);
					this.items.splice(3,4);
					if(this.status == 'Refund') this.items[2]['bgClass'] = "bg-danger";
				}
			}
		} else {
			this.items.splice(0,9);
		}

	}

	setDates():void {

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].dateValue = this.bid[this.items[i].dateKey];
		}

	}

}
