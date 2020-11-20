import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppPreferences } from '../../models/app-preferences';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent implements OnInit {
  
  settingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private prefsService: PreferencesService,
    private dialogRef: MatDialogRef<SettingDialogComponent>) {
    prefsService.getPreferences().subscribe(r => {
      this.settingForm = this.formBuilder.group({
        pomodoro: r.pomodoro,
        short: r.short,
        long: r.long        
      });
    });    
  }

  ngOnInit(): void { }

  save(): void {
    let prefs = new  AppPreferences();
    prefs.taskName = 'test1';
    Object.assign(prefs, this.settingForm.getRawValue());
    this.prefsService.savePreferences(prefs).subscribe(r => {
      this.dialogRef.close();
    });    
  }

  restore(): void {
    this.prefsService.clearPreferences().subscribe(r => {
      this.dialogRef.close();
    });
  }
}
