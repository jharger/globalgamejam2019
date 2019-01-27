import { handleActions } from 'redux-actions';
import { ItemTypes } from '../data/itemTypes';
import { ADD_INVENTORY, addInventory } from './gameActions';

export type InventoryType = { [type in ItemTypes]: number };

export interface GameState {
  inventory: InventoryType;
}

const initialState: GameState = {
  inventory: {
    [ItemTypes.WOOD]: 0,
  },
};

const reducers = {
  [ADD_INVENTORY]: (
    state: GameState,
    { payload }: ReturnType<typeof addInventory>
  ) => ({
    ...state,
    inventory: state.inventory,
  }),
};

const gameReducer = handleActions(reducers, initialState);

export { gameReducer };
