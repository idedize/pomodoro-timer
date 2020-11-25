import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-list-dialog',
  templateUrl: './log-list-dialog.component.html',
  styleUrls: ['./log-list-dialog.component.scss']
})
export class LogListDialogComponent implements OnInit {

  logs: Array<Log> = [];

  displayedColumns: string[] = ['beginDate', 'endDate', 'taskName'];

  constructor(logService: LogService) {
    this.logs = logService.getPreferences();
  }

  ngOnInit(): void {
  }

}
