import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  getPreferences(): T {
    let prefs = localStorage.getItem(this.prefsKey);

    if (!!prefs) {
      return JSON.parse(prefs) as T;
    }

    return this.defaultPrefs;
  }

  savePreferences(prefs: T): void {
    localStorage.setItem(this.prefsKey, JSON.stringify(prefs));
    this.onPreferencesUpdatedSubject.next(prefs);
  }

  clearPreferences(): void {
    localStorage.removeItem(this.prefsKey);
    this.onPreferencesUpdatedSubject.next(this.defaultPrefs);
  }
}
