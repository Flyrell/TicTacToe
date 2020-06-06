import { Tile } from '@/model/tile.model';
import { MatRipple } from '@angular/material/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import {
  Input,
  Output,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy, OnChanges,
} from '@angular/core';

@Component({
  template: '',
  selector: 'app-tile',
  providers: [ MatRipple ],
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent implements OnChanges {

  @Input() tile: Tile;
  @Output() ngSelect = new EventEmitter<void>();

  @HostBinding('style.backgroundImage') playerIconSrc: SafeStyle | null;

  constructor(private hostRef: ElementRef, private ripple: MatRipple, private domSanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.playerIconSrc = this.getPlayersIcon();
  }

  @HostListener('click', [ '$event' ]) onClick(event: MouseEvent): void {
    this.ngSelect.emit();
    this.rippleEffect(event);
  }

  private rippleEffect(event: MouseEvent): void {
    this.ripple.launch(event.x, event.y);
  }

  private getPlayersIcon(): SafeStyle | null {
    if (!this.tile.player) {
      return null;
    }
    return this.domSanitizer.bypassSecurityTrustStyle(`url("${this.tile.player.icon}")`);
  }
}
