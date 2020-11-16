import { Component, OnInit } from '@angular/core';
import { AppPreferences } from '../../models/app-setting';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  get minutes(): number {
    return 1;
  }

  get seconds(): number {
    return 1;
  }

  constructor(prefsService: PreferencesService) {
    
  }

  ngOnInit(): void {
  }

}
