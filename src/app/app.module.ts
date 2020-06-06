import { NgModule } from '@angular/core';
import { AppComponent } from '@/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PlaygroundModule } from '@/app/pages/playground/playground.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlaygroundModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
