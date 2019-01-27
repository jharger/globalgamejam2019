import { createAction } from 'redux-actions';
import { PlayerAction } from '../data/PlayerAction';
import { ScoreType } from '../data/score';

const ADD_INVENTORY = 'ADD_INVENTORY';
const addInventory = createAction(
  ADD_INVENTORY,
  (payload: { name: string; amount: number }) => payload
);

const REMOVE_INVENTORY = 'REMOVE_INVENTORY';
const removeInventory = createAction(
  REMOVE_INVENTORY,
  (payload: { name: string; amount: number }) => payload
);

const ADD_TO_LOG = 'ADD_TO_LOG';
const addToLog = createAction(ADD_TO_LOG, (payload: string) => payload);

const KILL_PLAYER = 'KILL_PLAYER';
const killPlayer = createAction(KILL_PLAYER);

const SET_ACTIVE_ACTION = 'SET_ACTIVE_ACTION';
const setActiveAction = createAction(
  SET_ACTIVE_ACTION,
  (payload: PlayerAction | null) => payload
);

const ADD_SCORE = 'ADD_SCORE';
const addScore = createAction(
  ADD_SCORE,
  (payload: { scoreType: ScoreType; amount: number }) => payload
);

export {
  ADD_INVENTORY,
  addInventory,
  REMOVE_INVENTORY,
  removeInventory,
  ADD_TO_LOG,
  addToLog,
  KILL_PLAYER,
  killPlayer,
  SET_ACTIVE_ACTION,
  setActiveAction,
  ADD_SCORE,
  addScore,
};
