import { select, Store } from '@ngrx/store';
import { AppState } from '@/app/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { newGame } from '@/app/store/actions/game.actions';
import { getWinner } from '@/app/store/selectors/game.selectors';
import { PreferencesComponent } from '@/app/components/preferences/preferences.component';
import { filter, switchMap } from 'rxjs/operators';
import { WinnerComponent } from '@/app/components/winner/winner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  winnerSubscription$$ = this.store.pipe(
    select(getWinner),
    filter(winner => !!winner),
    switchMap(winner => this.dialog.open(WinnerComponent, { data: winner }).afterClosed()),
  ).subscribe(() => this.newGame());

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnDestroy() {
    this.winnerSubscription$$.unsubscribe();
  }

  newGame(): void {
    this.store.dispatch(newGame());
  }

  openPreferences(): void {
    this.dialog.open(PreferencesComponent);
  }
}
