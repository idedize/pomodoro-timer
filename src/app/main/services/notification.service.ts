import { Injectable } from '@angular/core';
import { NotificationPermissionEnum } from '../models/notification-permission-enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  get isGranted(): boolean {
    return this.currentPermissionValue == NotificationPermissionEnum.granted;
  }

  get isDefault(): boolean {
    return this.currentPermissionValue == NotificationPermissionEnum.default;
  }

  get isDenied(): boolean {
    return this.currentPermissionValue == NotificationPermissionEnum.denied;
  }

  get currentPermissionValue(): NotificationPermissionEnum {
    return NotificationPermissionEnum[Notification.permission];
  }

  constructor() { }

  askPermission(): void {
    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission == "default") {
      Notification.requestPermission().then((p) => { });
    }
  }

  notify(title: string): void {
    if (this.currentPermissionValue == NotificationPermissionEnum.granted) {
      new Notification(title)
    }
  }
}
