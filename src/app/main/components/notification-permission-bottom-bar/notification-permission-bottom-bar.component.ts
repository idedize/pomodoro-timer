import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPermissionEnum } from '../../models/notification-permission-enum';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-permission-bottom-bar',
  templateUrl: './notification-permission-bottom-bar.component.html',
  styleUrls: ['./notification-permission-bottom-bar.component.scss']
})
export class NotificationPermissionBottomBarComponent implements OnInit {

  private _isClosed: boolean = false;
  get isHidden(): boolean {
    return this._isClosed ||
      this.notificationService.currentPermissionValue != NotificationPermissionEnum.default ||
      this.dialog.openDialogs.length > 0;
  }

  constructor(private notificationService: NotificationService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void { }

  close(): void {
    this._isClosed = true;
  }
}
