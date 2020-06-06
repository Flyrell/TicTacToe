import { Tile } from '@/model/tile.model';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  @Input() tiles: Tile[] = [];

  get playgroundSize(): number {
    return Math.sqrt(this.tiles.length);
  }

  @HostBinding('style.gridTemplateColumns') get gridTemplateColumns(): string {
    return `repeat(${this.playgroundSize}, 1fr)`;
  }

  onSelect(tile: Tile): void {
    this.tiles = this.tiles.map(item => {
      if (item !== tile) {
        return { ...item };
      }
      return { ...item };
    });
  }

  dontChangeComponents(): boolean {
    return true;
  }
}
