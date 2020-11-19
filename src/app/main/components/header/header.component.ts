import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FaqDialogComponent } from '../faq/faq-dialog/faq-dialog.component';
import { LogListDialogComponent } from '../log-list-dialog/log-list-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLogListDialog(): void {
    this.dialog.open(LogListDialogComponent, {
      width: '1080px',
      height: 'auto'
    });
  }

  openFAQDialog(): void {
    this.dialog.open(FaqDialogComponent);
  }

}
