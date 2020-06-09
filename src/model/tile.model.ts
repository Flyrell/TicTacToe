import { Player } from '@/model/player.model';

export class Tile {
  public player?: Player;

  constructor(public columnIndex: number, public rowIndex: number, public diagonalIndexes: number[], public gameId: number) {}
}

export interface TileArrays {
  rows: Array<Tile[]>;
  columns: Array<Tile[]>;
  diagonals: Array<Tile[]>;
}
