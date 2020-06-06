import { NgModule } from '@angular/core';
import { AppComponent } from '@/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PlaygroundModule } from '@/app/pages/playground/playground.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlaygroundModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
