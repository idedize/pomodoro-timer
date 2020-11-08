import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { TimerComponent } from './components/timer/timer.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: MainPageComponent }
]

@NgModule({
  declarations: [MainPageComponent, HeaderComponent, TimerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class MainModule { }
