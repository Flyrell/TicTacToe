import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from '@/app/app.component';
import { environment } from '@/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects, metaReducers } from '@/app/store';
import { PlaygroundModule } from '@/app/components/playground/playground.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    PlaygroundModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
