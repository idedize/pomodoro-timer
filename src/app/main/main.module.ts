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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogListDialogComponent } from './components/log-list-dialog/log-list-dialog.component';
import { FaqDialogComponent } from './components/faq/faq-dialog/faq-dialog.component';
import { FaqElementComponent } from './components/faq/faq-element/faq-element.component';
import { SettingDialogComponent } from './components/setting-dialog/setting-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    FaqElementComponent,
    SettingDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    ChangeTaskNameDialogComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class MainModule { }
