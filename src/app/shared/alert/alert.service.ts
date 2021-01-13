import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  messages$ = new Subject<AlertMessage>();

  constructor() {
  }

  setAlertMessage(type: MessageType, message: string, errorResponse?: HttpErrorResponse) {
    if (errorResponse) {
      console.error("Error", errorResponse);
    }
    const detail = this.createErrorMessage(errorResponse);
    this.messages$.next({ type, message, detail });
  }

  private createErrorMessage(errorResponse?: HttpErrorResponse): string {
    if (!errorResponse) {
      return null;
    }
    if (errorResponse.error) {
      if (errorResponse.error.rootException || errorResponse.error.rootMessage) {
        return errorResponse.error.rootException + ': ' + errorResponse.error.rootMessage;
      } else {
        return errorResponse.error.exception + ': ' + errorResponse.error.message;
      }
    } else {
      return errorResponse.status + " " + errorResponse.statusText + ": " + errorResponse.message;
    }
  }
}

export type MessageType =
  'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark';

export interface AlertMessage {
  type: MessageType;
  message: string;
  detail: string;
}
