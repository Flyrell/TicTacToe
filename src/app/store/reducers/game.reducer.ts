import { Player } from '@/model/player.model';
import { Tile, TileArrays } from '@/model/tile.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initializeTiles } from '@/app/utils/tile.utils';
import {
  newGame,
  nextPlayer,
  playerMove,
  setSize,
  setResult,
  setTilesToWin,
  updateTiles
} from '@/app/store/actions/game.actions';

export interface GameState extends TileArrays {
  size: number;
  tiles: Tile[];
  gameId: number;
  players: Player[];
  tilesToWin: number;
  winner: Player | null;
  draw: boolean;
  currentPlayer: Player;
}

const createPlayers = (): Player[] => [
  { id: 1, icon: '/assets/icons/o.svg' },
  { id: 2, icon: '/assets/icons/x.svg' },
];

const createInitialTileArrays = (): TileArrays => ({
  rows: [],
  columns: [],
  diagonals: [],
});

const createInitialState = (size: number = 3, tilesToWin: number = 3): GameState => {
  const gameId = Math.random();
  const players = createPlayers();
  const tileArrays = createInitialTileArrays();
  const tiles = initializeTiles(gameId, size, tileArrays);
  const randomPlayerIndex = Math.round(Math.random() + 1) - 1;
  return {
    size,
    tiles,
    gameId,
    players,
    winner: null,
    draw: false,
    tilesToWin,
    ...tileArrays,
    currentPlayer: players[randomPlayerIndex],
  };
};

const reducer = createReducer(
  createInitialState(),
  on(playerMove, state => state),
  on(setResult, (state, { winner, draw }) => ({ ...state, winner, draw })),
  on(newGame, ({ tilesToWin, size }) => createInitialState(size, tilesToWin)),
  on(setSize, ({ tilesToWin }, { size }) => createInitialState(size, tilesToWin)),
  on(setTilesToWin, ({ size }, { tilesToWin }) => createInitialState(size, tilesToWin)),
  on(updateTiles, (state, { tiles, tileArrays }) => ({ ...state, tiles, ...tileArrays })),
  on(nextPlayer, state => {
    const currentIndex = state.players.indexOf(state.currentPlayer);
    const nextIndex = currentIndex + 1;
    const next = nextIndex < state.players.length ? state.players[nextIndex] : state.players[0];
    return { ...state, currentPlayer: next };
  })
);

export function gameReducer(state: GameState, action: Action) {
  return reducer(state, action);
}
