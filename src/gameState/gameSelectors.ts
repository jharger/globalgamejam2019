import { createSelector } from 'reselect';
import { GameState } from './gameReducer';

const getInventory = ({ game }: { game: GameState }) => game.inventory;

const getActions = ({ game }: { game: GameState }) => game.actions;

const getLog = ({ game }: { game: GameState }) => game.log;

const getIsDead = ({ game }: { game: GameState }) => game.dead;

const getActiveAction = ({ game }: { game: GameState }) => game.activeAction;

const getActiveActions = createSelector(
  [getActions, getInventory, getActiveAction],
  (actions, inventory, activeAction) =>
    actions.filter(
      action =>
        action === activeAction ||
        !action.threshold ||
        action.threshold(inventory)
    )
);

const getScores = ({ game }: { game: GameState }) => game.scores;

const getSortedScores = createSelector(
  [getScores],
  scores => {
    const unsorted = Object.keys(scores).map(key => ({
      scoreType: key,
      amount: scores[key],
    }));

    return unsorted.sort((a, b) => b.amount - a.amount);
  }
);

export {
  getInventory,
  getActions,
  getLog,
  getIsDead,
  getActiveAction,
  getActiveActions,
  getScores,
  getSortedScores,
};
