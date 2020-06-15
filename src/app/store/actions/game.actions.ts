import { Player } from '@/model/player.model';
import { createAction, props } from '@ngrx/store';
import { Tile, TileArrays } from '@/model/tile.model';

enum GameActions {
  NEW_GAME = '[GAME] New game',
  SET_SIZE = '[GAME] Set size',
  SET_RESULT = '[GAME] Set result',
  NEXT_PLAYER = '[GAME] Next player',
  PLAYER_MOVE = '[GAME] Player move',
  UPDATE_TILES = '[GAME] Update tiles',
  SET_TILES_TO_WIN = '[GAME] Set tiles to win',
}

export const newGame = createAction(GameActions.NEW_GAME);
export const nextPlayer = createAction(GameActions.NEXT_PLAYER);
export const setSize = createAction(GameActions.SET_SIZE, props<{ size: number }>());
export const playerMove = createAction(GameActions.PLAYER_MOVE, props<{ tile: Tile }>());
export const setTilesToWin = createAction(GameActions.SET_TILES_TO_WIN, props<{ tilesToWin: number }>());
export const setResult = createAction(GameActions.SET_RESULT, props<{ winner: Player | null, draw: boolean }>());
export const updateTiles = createAction(GameActions.UPDATE_TILES, props<{ tile: Tile, tiles: Tile[], tileArrays: TileArrays }>());
