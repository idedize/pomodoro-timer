import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppPreferences } from '../models/app-preferences';
import { StorageBaseService } from './storage-base.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends StorageBaseService<AppPreferences> {

  static prefsKey: string = "APP_PREFS";

  constructor() {
    super(PreferencesService.prefsKey, new AppPreferences());
  }
}
