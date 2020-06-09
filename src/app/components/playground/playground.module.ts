import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileModule } from '@/app/components/tile/tile.module';
import { PlaygroundComponent } from '@/app/components/playground/playground.component';

@NgModule({
  declarations: [PlaygroundComponent],
  exports: [
    PlaygroundComponent
  ],
  imports: [
    TileModule,
    CommonModule,
  ]
})
export class PlaygroundModule { }
