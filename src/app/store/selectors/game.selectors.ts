import { AppState } from '@/app/store';
import { createSelector } from '@ngrx/store';
import { GameState } from '@/app/store/reducers/game.reducer';

const getGameState = (state: AppState): GameState => state.game;
export const getRows = createSelector(getGameState, state => state.rows);
export const getTiles = createSelector(getGameState, state => state.tiles);
export const getWinner = createSelector(getGameState, state => state.winner);
export const getGameId = createSelector(getGameState, state => state.gameId);
export const getColumns = createSelector(getGameState, state => state.columns);
export const getDiagonals = createSelector(getGameState, state => state.diagonals);
export const getPlaygroundSize = createSelector(getGameState, state => state.size);
export const getWinningTiles = createSelector(getGameState, state => state.winningTiles);
export const getCurrentPlayer = createSelector(getGameState, state => state.currentPlayer);
