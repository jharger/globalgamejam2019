import { gameReducer, GameState } from './gameState/gameReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

const rootReducer = combineReducers({
  game: gameReducer,
} as any);

export interface RootState {
  game: GameState;
}

const middleware: any = [];

// Necessary if we want to use Redux Devtools
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
