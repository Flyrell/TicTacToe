import { Tile, TileArrays } from '@/model/tile.model';

export const sortTiles = (tiles: Tile[], size: number): Tile[] => {
  const newTiles = [];
  for (let i = tiles.length - 1; i >= 0; i -= size) {
    for (let j = 0; j < size; j++) {
      newTiles[tiles.length - 1 - i + j] = tiles[i - size + 1 + j];
    }
  }
  return newTiles;
};

export const createTile = (index: number, size: number, gameId: number): Tile => {
  const y = Math.floor(index / size);
  const x = index - y * size;
  return new Tile(
    x,
    y,
    [ x + y, (size * 2 - 1) + (size - 1) + y - x ],
    gameId
  );
};

export const createTiles = (gameId: number, size: number): Tile[] => {
  return Array.from({ length: size * size }).map((_, index) => createTile(index, size, gameId));
};

export const fillTileArrays = (tiles: Tile[], tileArrays: TileArrays): void => {
  for (const tile of tiles) {

    // Fill row
    if (tileArrays.rows[tile.rowIndex]) {
      tileArrays.rows[tile.rowIndex].push(tile);
    } else {
      tileArrays.rows[tile.rowIndex] = [ tile ];
    }

    // Fill column
    if (tileArrays.columns[tile.columnIndex]) {
      tileArrays.columns[tile.columnIndex].push(tile);
    } else {
      tileArrays.columns[tile.columnIndex] = [ tile ];
    }

    // Fill diagonals
    tile.diagonalIndexes.map(diagonalIndex => {
      if (tileArrays.diagonals[diagonalIndex]) {
        tileArrays.diagonals[diagonalIndex].push(tile);
      } else {
        tileArrays.diagonals[diagonalIndex] = [ tile ];
      }
    });
  }
};

export const initializeTiles = (gameId: number, size: number, tileArrays: TileArrays): Tile[] => {
  const tiles = createTiles(gameId, size);
  const sortedTiles = sortTiles(tiles, size);
  fillTileArrays(sortedTiles, tileArrays);
  return sortedTiles;
};
