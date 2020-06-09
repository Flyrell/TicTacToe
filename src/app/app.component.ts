import { Store } from '@ngrx/store';
import { AppState } from '@/app/store';
import { Component } from '@angular/core';
import { newGame } from '@/app/store/actions/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<AppState>) {}

  newGame(): void {
    this.store.dispatch(newGame());
  }
}
