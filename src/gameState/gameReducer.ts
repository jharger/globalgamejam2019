import { handleActions } from 'redux-actions';
import { Items } from '../data/items';
import {
  ADD_INVENTORY,
  ADD_SCORE,
  ADD_TO_LOG,
  addInventory,
  addScore,
  addToLog,
  KILL_PLAYER,
  REMOVE_INVENTORY,
  removeInventory,
  SET_ACTIVE_ACTION,
  setActiveAction,
} from './gameActions';
import actions from '../data/actions';
import { PlayerAction } from '../data/PlayerAction';

export type InventoryType = { [type: string]: number };
export type ScoreType = { [type: string]: number };
export interface LogEntry {
  id: number;
  line: string;
}

export interface GameState {
  inventory: InventoryType;
  actions: PlayerAction[];
  log: LogEntry[];
  lastLogId: number;
  dead: boolean;
  activeAction: PlayerAction | null;
  scores: ScoreType;
}

const initialState: GameState = {
  actions,
  inventory: {
    [Items.HOME]: 1,
    [Items.FOOD]: 10,
  },
  log: [],
  lastLogId: 0,
  dead: false,
  activeAction: null,
  scores: {},
};

const reducers = {
  [ADD_INVENTORY]: (
    state: GameState,
    { payload }: ReturnType<typeof addInventory>
  ) => {
    if (!payload) {
      return state;
    }

    return {
      ...state,
      inventory: {
        ...state.inventory,
        [payload.name]: (state.inventory[payload.name] || 0) + payload.amount,
      },
    };
  },

  [REMOVE_INVENTORY]: (
    state: GameState,
    { payload }: ReturnType<typeof removeInventory>
  ) => {
    if (!payload) {
      return state;
    }

    return {
      ...state,
      inventory: {
        ...state.inventory,
        [payload.name]: Math.max(
          0,
          (state.inventory[payload.name] || 0) - payload.amount
        ),
      },
    };
  },

  [ADD_TO_LOG]: (
    state: GameState,
    { payload }: ReturnType<typeof addToLog>
  ) => {
    const entry: LogEntry = {
      id: state.lastLogId + 1,
      line: payload || '',
    };
    const log: LogEntry[] = [...state.log, entry];
    if (log.length > 10) {
      log.unshift();
    }
    return { ...state, log, lastLogId: entry.id };
  },

  [KILL_PLAYER]: (state: GameState) => ({ ...state, dead: true }),

  [SET_ACTIVE_ACTION]: (
    state: GameState,
    { payload }: ReturnType<typeof setActiveAction>
  ) => ({ ...state, activeAction: payload }),

  [ADD_SCORE]: (state: GameState, { payload }: ReturnType<typeof addScore>) => {
    if (!payload) {
      return state;
    }

    return {
      ...state,
      scores: {
        ...state.scores,
        [payload.scoreType]:
          (state.scores[payload.scoreType] || 0) + payload.amount,
      },
    };
  },
};

const gameReducer = handleActions(reducers as any, initialState);

export { gameReducer };
