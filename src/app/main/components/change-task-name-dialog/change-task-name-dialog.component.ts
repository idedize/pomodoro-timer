import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppPreferences } from '../../models/app-preferences';
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
    private dialogRef: MatDialogRef<ChangeTaskNameDialogComponent>
  ) {
    this._prefs = prefsService.getPreferences();
    this.name = this._prefs.taskName;
  }

  ngOnInit(): void {
  }

  saveTaskName(): void {
    this._prefs.taskName = this.name;
    this.prefsService.savePreferences(this._prefs);
    this.dialogRef.close();
  }
}
