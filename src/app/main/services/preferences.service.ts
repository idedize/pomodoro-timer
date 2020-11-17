import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppPreferences } from '../models/app-setting';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private static prefsKey: string = "APP_PREFS";

  constructor() { }

  getPreferences(): Observable<AppPreferences> {
    let prefs = localStorage.getItem(PreferencesService.prefsKey);

    if (!!prefs) {
      return of<AppPreferences>(JSON.parse(prefs) as AppPreferences);
    }

    return of<AppPreferences>(new AppPreferences());
  }

  savePreferences(prefs: AppPreferences): Observable<void> {
    localStorage.setItem(PreferencesService.prefsKey, JSON.stringify(prefs));
    return of(void 0);
  }

  clearPreferences(): Observable<void> {
    localStorage.removeItem(PreferencesService.prefsKey);
    return of();
  }
}
