import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { StorageBaseService } from './storage-base.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends StorageBaseService<Array<Log>> {

  static prefsKey: string = "APP_LOGS";

  constructor() {
    super(LogService.prefsKey, new Array<Log>());
  }  
}
