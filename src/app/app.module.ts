import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};

@NgModule({
  declarations: [    
    RootComponent
  ],
  imports: [    
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
