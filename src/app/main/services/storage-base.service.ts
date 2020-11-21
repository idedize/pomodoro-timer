import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageBaseService<T> {

  private onPreferencesUpdatedSubject: Subject<T> = new Subject();

  constructor(protected prefsKey: string,
    protected defaultPrefs: T) { }

  onPreferencesUpdated(): Observable<T> {
    return this.onPreferencesUpdatedSubject.asObservable();
  }

  getPreferences(): Observable<T> {
    let prefs = localStorage.getItem(this.prefsKey);

    if (!!prefs) {
      return of<T>(JSON.parse(prefs) as T);
    }

    return of<T>(this.defaultPrefs);
  }

  savePreferences(prefs: T): Observable<void> {
    localStorage.setItem(this.prefsKey, JSON.stringify(prefs));
    this.onPreferencesUpdatedSubject.next(prefs);
    return of(void 0);
  }

  clearPreferences(): Observable<void> {
    localStorage.removeItem(this.prefsKey);
    this.onPreferencesUpdatedSubject.next(this.defaultPrefs);
    return of(void 0);
  }
}
