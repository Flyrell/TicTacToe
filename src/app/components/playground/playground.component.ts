import { Observable } from 'rxjs';
import { AppState } from '@/app/store';
import { Tile } from '@/model/tile.model';
import { select, Store } from '@ngrx/store';
import { playerMove } from '@/app/store/actions/game.actions';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { getPlaygroundSize, getTiles, getGameId } from '@/app/store/selectors/game.selectors';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnDestroy {

  gameId: number;
  playgroundSize: number;
  tiles$: Observable<Tile[]> = this.store.pipe(select(getTiles));
  gameIdSubscription$$ = this.store.pipe(select(getGameId)).subscribe(gameId => this.gameId = gameId);
  playgroundSizeSubscription$$ = this.store.pipe(select(getPlaygroundSize)).subscribe(size => this.playgroundSize = size);

  @HostBinding('style.gridTemplateColumns') get gridTemplateColumns(): string {
    return `repeat(${this.playgroundSize}, 1fr)`;
  }

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.gameIdSubscription$$.unsubscribe();
    this.playgroundSizeSubscription$$.unsubscribe();
  }

  onSelect(tile: Tile): void {
    this.store.dispatch(playerMove({ tile }));
  }

  trackByGameId(): number {
    return this.gameId;
  }
}
