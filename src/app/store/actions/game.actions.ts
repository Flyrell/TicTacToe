import { Player } from '@/model/player.model';
import { createAction, props } from '@ngrx/store';
import { Tile, TileArrays } from '@/model/tile.model';

enum GameActions {
  NEW_GAME = '[GAME] New game',
  SET_SIZE = '[GAME] Set size',
  SET_WINNER = '[GAME] Set winner',
  NEXT_PLAYER = '[GAME] Next player',
  PLAYER_MOVE = '[GAME] Player move',
  UPDATE_TILES = '[GAME] Update tiles',
  SET_WINNING_TILES = '[GAME] Set winning tiles',
}

export const newGame = createAction(GameActions.NEW_GAME);
export const nextPlayer = createAction(GameActions.NEXT_PLAYER);
export const setSize = createAction(GameActions.SET_SIZE, props<{ size: number }>());
export const playerMove = createAction(GameActions.PLAYER_MOVE, props<{ tile: Tile }>());
export const setWinner = createAction(GameActions.SET_WINNER, props<{ winner: Player }>());
export const setWinningTiles = createAction(GameActions.SET_WINNING_TILES, props<{ winningTiles: number }>());
export const updateTiles = createAction(GameActions.UPDATE_TILES, props<{ tile: Tile, tiles: Tile[], tileArrays: TileArrays }>());
