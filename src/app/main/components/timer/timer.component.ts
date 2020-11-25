import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppPreferences } from '../../models/app-preferences';
import { Log } from '../../models/log';
import { PeriodEnum } from '../../models/period.enum';
import { LogService } from '../../services/log.service';
import { NotificationService } from '../../services/notification.service';
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
  private _currentPeriod: PeriodEnum = PeriodEnum.Pomodoro;
  private _timerId;

  //#region Timer field
  get minutes(): string {
    return Math.floor(this._time / 60).toString();
  }

  get seconds(): string {
    let seconds = this._time % 60;
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }

  get remainTime(): string {
    return `${this.minutes}:${this.seconds}`
  }
  //#endregion

  get taskName(): string {
    return this._prefs.taskName;
  }

  constructor(
    private prefsService: PreferencesService,
    private logService: LogService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private title: Title
  ) {
    this.onAppSettingUpdatedHandler(this.prefsService.getPreferences());
    this._logs = this.logService.getPreferences();

    this.prefsService.onPreferencesUpdated().subscribe(r => {
      this.onAppSettingUpdatedHandler(r);
    });
  }

  ngOnInit(): void {
  }

  updatePeriod(): void {
    this._currentPeriod = this._currentPeriod == PeriodEnum.Pomodoro ? PeriodEnum.Break : PeriodEnum.Pomodoro;
  }

  onAppSettingUpdatedHandler(prefs: AppPreferences): void {
    this._prefs = prefs;
    //this._time = prefs.pomodoro * AppPreferences.secondsInMinute;
    this._time = 3;
    this._selectedTime = prefs.pomodoro * AppPreferences.secondsInMinute;
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
    this._selectedTime = this._prefs.pomodoro * AppPreferences.secondsInMinute;
    this.reset();
  }

  selectLong(): void {
    this._selectedTime = this._prefs.long * AppPreferences.secondsInMinute;
    this.reset();
  }

  selectShort(): void {
    this._selectedTime = this._prefs.short * AppPreferences.secondsInMinute;
    this.reset();
  }

  private intervalHandler(): void {
    this._time--;

    this.title.setTitle(this.remainTime);

    if (this._time == 0) {
      this.notificationService.notify(`The ${PeriodEnum[this._currentPeriod]} is over`);

      this.updatePeriod();

      this.title.setTitle(`${environment.appName} ${PeriodEnum[this._currentPeriod]}`);

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
