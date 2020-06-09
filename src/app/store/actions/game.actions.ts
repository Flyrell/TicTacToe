import { Player } from '@/model/player.model';
import { createAction, props } from '@ngrx/store';
import { Tile, TileArrays } from '@/model/tile.model';

enum GameActions {
  NEW_GAME = '[GAME] New game',
  SET_WINNER = '[GAME] Set winner',
  NEXT_PLAYER = '[GAME] Next player',
  PLAYER_MOVE = '[GAME] Player move',
  UPDATE_TILES = '[GAME] Update tiles',
}

export const newGame = createAction(GameActions.NEW_GAME);
export const nextPlayer = createAction(GameActions.NEXT_PLAYER);
export const playerMove = createAction(GameActions.PLAYER_MOVE, props<{ tile: Tile }>());
export const setWinner = createAction(GameActions.SET_WINNER, props<{ winner: Player }>());
export const updateTiles = createAction(GameActions.UPDATE_TILES, props<{ tile: Tile, tiles: Tile[], tileArrays: TileArrays }>());
