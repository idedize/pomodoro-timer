import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { TimerComponent } from './components/timer/timer.component';
import { ChangeTaskNameDialogComponent } from './components/change-task-name-dialog/change-task-name-dialog.component';
import { FormsModule } from '@angular/forms';
import { LogListDialogComponent } from './components/log-list-dialog/log-list-dialog.component';
import { FaqDialogComponent } from './components/faq/faq-dialog/faq-dialog.component';
import { FaqElementComponent } from './components/faq/faq-element/faq-element.component';

const routes: Routes = [
  { path: '', component: MainPageComponent }
]

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    TimerComponent,
    ChangeTaskNameDialogComponent,
    LogListDialogComponent,
    FaqDialogComponent,
    FaqElementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule
  ],
  entryComponents: [
    ChangeTaskNameDialogComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class MainModule { }
