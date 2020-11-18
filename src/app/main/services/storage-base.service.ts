import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageBaseService<T> {  

  constructor(protected prefsKey: string,
    protected defaultPrefs: T) { }

  getPreferences(): Observable<T> {
    let prefs = localStorage.getItem(this.prefsKey);

    if (!!prefs) {
      return of<T>(JSON.parse(prefs) as T);
    }

    return of<T>(this.defaultPrefs);
  }

  savePreferences(prefs: T): Observable<void> {
    localStorage.setItem(this.prefsKey, JSON.stringify(prefs));
    return of(void 0);
  }

  clearPreferences(): Observable<void> {
    localStorage.removeItem(this.prefsKey);
    return of(void 0);
  }
}
