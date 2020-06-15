import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ResultComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class ResultModule { }
