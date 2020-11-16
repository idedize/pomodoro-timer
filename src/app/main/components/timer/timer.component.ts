import { Component, OnInit } from '@angular/core';
import { AppPreferences } from '../../models/app-setting';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private _prefs: AppPreferences;
  private _time: number;
  private _selectedTime;
  private _timerId;

  get minutes(): string {
    return Math.floor(this._time / 60).toString();
  }

  get seconds(): string {
    let seconds = this._time % 60;
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }

  constructor(prefsService: PreferencesService) {
    prefsService.getPreferences().subscribe(r => {
      this._prefs = r;
      this._time = r.pomodoro;
      this._selectedTime = r.pomodoro;
    });
  }

  ngOnInit(): void {
  }

  start(): void {
    if (!this._timerId) {
      this.intervalHandler();
      this._timerId = setInterval(() => this.intervalHandler(), 1000);
    }
  }

  stop(): void {
    clearInterval(this._timerId);
    this._timerId = null;
  }

  reset(): void {
    this.stop();
    this._time = this._selectedTime;
  }

  selectPomodoro(): void {
    this._selectedTime = this._prefs.pomodoro;
    this.reset();
  }

  selectLong(): void {
    this._selectedTime = this._prefs.long;
    this.reset();
  }

  selectShort(): void {
    this._selectedTime = this._prefs.short;
    this.reset();
  }

  private intervalHandler(): void {
    this._time--;
    if (this._time == 0) {
      this.stop();
    }
  }
}
