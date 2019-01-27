import { handleActions } from 'redux-actions';
import { ItemTypes } from './itemTypes';

export type InventoryType = { [type in ItemTypes]: number };

export interface GameState {
  inventory: InventoryType;
}

const initialState: GameState = {
  inventory: {
    [ItemTypes.WOOD]: 0,
  },
};

const reducers = {};

const gameReducer = handleActions(reducers, initialState);

export { gameReducer };
