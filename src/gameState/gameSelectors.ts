import { createSelector } from 'reselect';
import { GameState } from './gameReducer';

const getInventory = ({ game }: { game: GameState }) => game.inventory;

export { getInventory };
