import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppPreferences } from '../../models/app-preferences';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { PreferencesService } from '../../services/preferences.service';
import { ChangeTaskNameDialogComponent } from '../change-task-name-dialog/change-task-name-dialog.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private _prefs: AppPreferences;
  private _logs: Array<Log>;
  private _log: Log = new Log();
  private _time: number;
  private _selectedTime: number;
  private _timerId;
  
  //#region Timer field
  get minutes(): string {
    return Math.floor(this._time / 60).toString();
  }

  get seconds(): string {
    let seconds = this._time % 60;
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }
  //#endregion

  get taskName(): string {
    return this._prefs.taskName;
  }

  constructor(
    private prefsService: PreferencesService,
    private logService: LogService,
    private dialog: MatDialog
  ) {
    this.prefsService.getPreferences().subscribe(r => {
      this.onAppSettingUpdatedHandler(r);
    });
    this.logService.getPreferences().subscribe(r => {
      this.onLogUpdatedHandler(r);
    })

    this.prefsService.onPreferencesUpdated().subscribe(r => {
      this.onAppSettingUpdatedHandler(r);
    });

    this.logService.onPreferencesUpdated().subscribe(r => {
      this.onLogUpdatedHandler(r);
    });    
  }

  ngOnInit(): void {
  }

  onAppSettingUpdatedHandler(prefs: AppPreferences): void {
    this._prefs = prefs;
    this._time = prefs.pomodoro * AppPreferences.secondsInMinutes;
    this._selectedTime = prefs.pomodoro * AppPreferences.secondsInMinutes;
  }

  onLogUpdatedHandler(log: Array<Log>): void {
    this._logs = log;
  }

  //#region Timer functions
  start(): void {
    if (!this._timerId) {
      this._log.beginDate = new Date();
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
    this._selectedTime = this._prefs.pomodoro * AppPreferences.secondsInMinutes;
    this.reset();
  }

  selectLong(): void {
    this._selectedTime = this._prefs.long * AppPreferences.secondsInMinutes;
    this.reset();
  }

  selectShort(): void {
    this._selectedTime = this._prefs.short * AppPreferences.secondsInMinutes;
    this.reset();
  }

  private intervalHandler(): void {
    this._time--;
    if (this._time == 0) {
      this._log.endDate = new Date();
      this._log.taskName = this.taskName;
      this._logs.push(this._log);
      this._log = new Log();
      this.logService.savePreferences(this._logs);
      this.stop();
    }
  }

  //#endregion

  openChangeTaskNameDialog(): void {
    this.dialog.open(ChangeTaskNameDialogComponent, {});
  }

}
