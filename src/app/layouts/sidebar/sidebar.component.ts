import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	
	@Input() active: string;
	@Input() access: object;
	@Input() adminType:string;
	@Input() defaultDashboard:string;
	@Input() acessDashboard = [];
  	@Output() Layout = new EventEmitter<any>();  
  	
  	constructor( ) { }

	ngOnInit() {
	}

	layout( key ) {
		this.Layout.emit( key );
	}
}
