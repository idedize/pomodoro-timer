import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppPreferences } from '../../models/app-preferences';
import { NotificationService } from '../../services/notification.service';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent implements OnInit {

  settingForm: FormGroup;
  prefs: AppPreferences;

  constructor(public notificationPermission: NotificationService,
    private formBuilder: FormBuilder,
    private prefsService: PreferencesService,
    private dialogRef: MatDialogRef<SettingDialogComponent>
  ) {
    this.prefs = prefsService.getPreferences();
    this.settingForm = this.formBuilder.group({
      pomodoro: this.prefs.pomodoro,
      short: this.prefs.short,
      long: this.prefs.long
    });
  }

  ngOnInit(): void { }

  save(): void {
    Object.assign(this.prefs, this.settingForm.getRawValue());
    this.prefsService.savePreferences(this.prefs);
    this.dialogRef.close();
  }

  restore(): void {
    this.prefsService.clearPreferences();
    this.dialogRef.close();
  }
}
