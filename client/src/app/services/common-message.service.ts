import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonMessageService {

  constructor(private _messageService: MessageService) { }

  showSuccess(message: string, summary:string = 'Success') {
    this._messageService.add({severity:'success', summary: summary, detail: message});
  }

  showError(message: string, summary: string = 'Error') {
    this._messageService.add({severity:'error', summary: summary, detail: message});
  }

  showInfo(message: string, summary:string = 'Info') {
    this._messageService.add({severity:'info', summary: summary, detail: message});
  }

  showWarning(message:string, summary:string='Warning') {
    this._messageService.add({severity:'warn', summary:summary, detail:message});
  }
  
}
