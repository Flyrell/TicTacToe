import { Type } from '@angular/core';
import { Action, MetaReducer } from '@ngrx/store';
import { environment } from '@/environments/environment';
import { GameEffects } from '@/app/store/effects/game.effects';
import { gameReducer, GameState } from '@/app/store/reducers/game.reducer';
import { consoleLogger } from '@/app/store/meta-reducers/console-logger.reducer';

export interface AppState {
  game: GameState;
}

export const reducers: Record<keyof AppState, (state: AppState[keyof AppState], action: Action) => AppState[keyof AppState]> = {
  game: gameReducer,
};

export const metaReducers: MetaReducer[] = environment.production ? [] : [ consoleLogger ];

export const effects: Type<any>[] = [ GameEffects ];
