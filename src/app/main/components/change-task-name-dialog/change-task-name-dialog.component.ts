import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppPreferences } from '../../models/app-setting';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-change-task-name-dialog',
  templateUrl: './change-task-name-dialog.component.html',
  styleUrls: ['./change-task-name-dialog.component.scss']
})
export class ChangeTaskNameDialogComponent implements OnInit {

  private _prefs: AppPreferences;

  name: string = '';

  constructor(private prefsService: PreferencesService,
    private dialogRef: MatDialogRef<ChangeTaskNameDialogComponent>) {
    prefsService.getPreferences().subscribe(r => {
      this._prefs = r;
    });
  }

  ngOnInit(): void {
  }

  saveTaskName(): void {
    this._prefs.taskName = this.name;
    this.prefsService.savePreferences(this._prefs).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
