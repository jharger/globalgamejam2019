import { gameReducer, GameState } from './gameState/gameReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from '@redux-saga/core/effects';

const rootReducer = combineReducers({
  game: gameReducer,
} as any);

export interface RootState {
  game: GameState;
}

function* rootSaga() {
  yield all([]);
}

const sagaMiddleware = createSagaMiddleware();
const middleware: any = [sagaMiddleware];

// Necessary if we want to use Redux Devtools
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);

export { store };
