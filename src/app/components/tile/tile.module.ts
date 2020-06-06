import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TileComponent } from '@/app/components/tile/tile.component';

@NgModule({
  declarations: [TileComponent],
  exports: [
    TileComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule
  ]
})
export class TileModule {}
