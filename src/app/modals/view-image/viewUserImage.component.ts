import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface PromptModel {
  imageUrl:string;
  type:string
}

@Component({
  selector: 'view-image',
  templateUrl: 'viewImage.component.html'
})

export class ViewUserImageComponent extends DialogComponent<PromptModel, string> implements PromptModel {
  imageUrl: string;
  type:string

  constructor(
    dialogService: DialogService ) {
    super(dialogService);
  }

}
