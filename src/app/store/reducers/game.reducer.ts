import { Player } from '@/model/player.model';
import { Tile, TileArrays } from '@/model/tile.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initializeTiles } from '@/app/utils/tile.utils';
import { newGame, nextPlayer, playerMove, setWinner, updateTiles } from '@/app/store/actions/game.actions';

export interface GameState extends TileArrays {
  size: number;
  tiles: Tile[];
  gameId: number;
  players: Player[];
  winningTiles: number;
  winner: Player | null;
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

const createInitialState = (): GameState => {
  const size = 5;
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
    ...tileArrays,
    winningTiles: 3,
    currentPlayer: players[randomPlayerIndex],
  };
};

const reducer = createReducer(
  createInitialState(),
  on(playerMove, state => state),
  on(newGame, () => createInitialState()),
  on(setWinner, (state, { winner }) => ({ ...state, winner })),
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
