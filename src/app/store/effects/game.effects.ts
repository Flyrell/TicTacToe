import { AppState } from '@/app/store';
import { Tile } from '@/model/tile.model';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Player } from '@/model/player.model';
import { map, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { nextPlayer, playerMove, setWinner, updateTiles } from '@/app/store/actions/game.actions';
import { getColumns, getCurrentPlayer, getDiagonals, getRows, getTiles, getWinningTiles } from '@/app/store/selectors/game.selectors';

@Injectable()
export class GameEffects {

  constructor(private store: Store<AppState>, private actions$: Actions) {}

  updateTilesOnPlayerMove$ = createEffect(() => this.actions$.pipe(
    ofType(playerMove),
    withLatestFrom(
      this.store.pipe(select(getCurrentPlayer)),
      this.store.pipe(select(getTiles)),
      this.store.pipe(select(getRows)),
      this.store.pipe(select(getColumns)),
      this.store.pipe(select(getDiagonals)),
    ),
    map(([ { tile }, player, tiles, rows, columns, diagonals ]) => {
      const newTile = new Tile(tile.columnIndex, tile.rowIndex, tile.diagonalIndexes, tile.gameId);
      newTile.player = player;

      const newTiles = GameEffects.findAndReplace<Tile>(tiles, tile, newTile);

      const newRow = GameEffects.findAndReplace<Tile>(rows[tile.rowIndex], tile, newTile);
      const newRows = GameEffects.findAndReplace<Tile[]>(rows, rows[tile.rowIndex], newRow);

      const newColumn = GameEffects.findAndReplace<Tile>(columns[tile.columnIndex], tile, newTile);
      const newColumns = GameEffects.findAndReplace<Tile[]>(columns, columns[tile.columnIndex], newColumn);

      let newDiagonals = diagonals;
      for (const diagonalIndex of tile.diagonalIndexes) {
        const newDiagonal = GameEffects.findAndReplace<Tile>(newDiagonals[diagonalIndex], tile, newTile);
        newDiagonals = GameEffects.findAndReplace<Tile[]>(newDiagonals, newDiagonals[diagonalIndex], newDiagonal);
      }

      return updateTiles({
        tile: newTile,
        tiles: newTiles,
        tileArrays: {
          rows: newRows,
          columns: newColumns,
          diagonals: newDiagonals,
        }
      });
    }),
  ));

  checkWinnerOnUpdateTiles$ = createEffect(() => this.actions$.pipe(
    ofType(updateTiles),
    withLatestFrom(this.store.pipe(select(getWinningTiles))),
    map(([{ tile, tileArrays }, winningTiles]) => {
      let winner = GameEffects.checkWinnerInArray(tileArrays.rows[tile.rowIndex], winningTiles);
      if (winner) {
        return setWinner({ winner });
      }

      winner = GameEffects.checkWinnerInArray(tileArrays.columns[tile.columnIndex], winningTiles);
      if (winner) {
        return setWinner({ winner });
      }

      for (const diagonalIndex of tile.diagonalIndexes) {
        winner = GameEffects.checkWinnerInArray(tileArrays.diagonals[diagonalIndex], winningTiles);
        if (winner) {
          return setWinner({ winner });
        }
      }

      return nextPlayer();
    }),
  ));

  private static checkWinnerInArray(array: Tile[], winningTiles: number): Player | null {
    let inRow: number = 1;
    let lastPlayer: Player | null = null;
    for (const tile of array) {
      inRow = lastPlayer === tile.player ? inRow + 1 : 1;
      lastPlayer = tile.player || null;

      if (inRow === winningTiles) {
        return lastPlayer;
      }
    }
    return null;
  }

  private static findAndReplace<T>(array: T[], oldItem: T, newItem: T) {
    const tileIndex = array.findIndex(item => item === oldItem);
    const newTiles = [ ...array ];
    newTiles[tileIndex] = newItem;
    return newTiles;
  }
}
