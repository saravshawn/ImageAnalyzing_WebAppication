import { Injectable } from '@angular/core';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private notifier:NotifierService;

  constructor(notify:NotifierService) {
    this.notifier = notify;
   }

   public showNotifications(type:string,message:string):void{
    this.notifier.notify(type,message);
   }
}
