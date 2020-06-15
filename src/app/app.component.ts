import { select, Store } from '@ngrx/store';
import { AppState } from '@/app/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { newGame } from '@/app/store/actions/game.actions';
import { getResult } from '@/app/store/selectors/game.selectors';
import { PreferencesComponent } from '@/app/components/preferences/preferences.component';
import { filter, switchMap } from 'rxjs/operators';
import { ResultComponent } from '@/app/components/result/result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  resultSubscription$$ = this.store.pipe(
    select(getResult),
    filter(result => !!result.winner || result.draw),
    switchMap((data) => this.dialog.open(ResultComponent, { data }).afterClosed()),
  ).subscribe(() => this.newGame());

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnDestroy() {
    this.resultSubscription$$.unsubscribe();
  }

  newGame(): void {
    this.store.dispatch(newGame());
  }

  openPreferences(): void {
    this.dialog.open(PreferencesComponent);
  }
}
