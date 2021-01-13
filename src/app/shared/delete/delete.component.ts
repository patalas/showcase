import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mp-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  heading = 'Confirm';
  text = 'Do you really want to delete this entry?';
  cancelBtnLabel = 'Cancel';
  confirmBtnLabel = 'Delete';

  @ViewChild('cancel') cancelElement: ElementRef;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.cancelElement.nativeElement.focus();
    }, 0);
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
