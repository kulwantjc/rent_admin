import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
@Component({
  selector: 'image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent implements OnInit {

	@ViewChild('successModal') public successModal: ModalDirective;

	@Input() popupImagePath:any;
  	
  	constructor() { }

  	ngOnInit() { }
	
	ngOnChanges(event) {
	  	if(this.popupImagePath) this.successModal.show();
	  }

}
