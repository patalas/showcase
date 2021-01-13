import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mp-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {


  title = '';
  text = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onCancelClicked() {
    console.log("on cancel clicked");
    this.activeModal.dismiss();
  }

  onConfirmClicked() {
    console.log("on confirm clicked");
    this.activeModal.close();
  }

}
