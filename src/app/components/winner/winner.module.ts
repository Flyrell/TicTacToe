import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from './winner.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [WinnerComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class WinnerModule { }
