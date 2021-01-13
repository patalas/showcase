import { AlertMessage, AlertService } from './alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mp-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  messages = [];
  private subscription: Subscription;

  constructor(private service: AlertService) { }

  ngOnInit() {
    this.subscription = this.service.messages$.subscribe((message) => {
      this.newMessage(message);
    })
  }

  private newMessage(message: AlertMessage) {
    this.messages.push(message);
    const timeout = message.type === 'danger' ? 10000 : 3000;
    setTimeout(() => {
     this.removeMessage(message);
    }, timeout);
  }

  removeMessage(message: AlertMessage) {
    this.messages = this.messages.filter(m => m !== message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
