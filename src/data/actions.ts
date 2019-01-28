import { PlayerAction } from './PlayerAction';
import {
  addInventory,
  addScore,
  addToLog,
  removeInventory,
} from '../gameState/gameActions';
import { Items } from './items';
import { InventoryType } from '../gameState/gameReducer';
import { ScoreType } from './score';

const getAmount = (inventory: InventoryType, itemType: Items) =>
  inventory[itemType] || 0;

const actions: PlayerAction[] = [
  new PlayerAction(
    'get a job',
    7,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 3 }));
      dispatch(addInventory({ name: Items.JOB, amount: 1 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 5 }));
    },
    inventory =>
      getAmount(inventory, Items.JOB) < 1 &&
      getAmount(inventory, Items.BETTER_JOB) < 1 &&
      getAmount(inventory, Items.AMAZING_JOB) < 1
  ),
  new PlayerAction(
    'get a good job',
    7,
    [{ itemType: Items.EDUCATION, quantity: 10 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 3 }));
      dispatch(addInventory({ name: Items.BETTER_JOB, amount: 1 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 5 }));
      dispatch(removeInventory({ name: Items.JOB, amount: 1000 }));
    },
    inventory =>
      getAmount(inventory, Items.EDUCATION) >= 5 &&
      getAmount(inventory, Items.JOB) >= 1 &&
      getAmount(inventory, Items.BETTER_JOB) < 1 &&
      getAmount(inventory, Items.AMAZING_JOB) < 1
  ),
  new PlayerAction(
    'get an amazing job',
    7,
    [{ itemType: Items.EDUCATION, quantity: 20 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 3 }));
      dispatch(addScore({ scoreType: ScoreType.STATUS, amount: 1 }));
      dispatch(addInventory({ name: Items.AMAZING_JOB, amount: 1 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 5 }));
      dispatch(removeInventory({ name: Items.JOB, amount: 1000 }));
      dispatch(removeInventory({ name: Items.BETTER_JOB, amount: 1000 }));
    },
    inventory =>
      getAmount(inventory, Items.AMAZING_JOB) < 1 &&
      getAmount(inventory, Items.EDUCATION) >= 5 &&
      (getAmount(inventory, Items.JOB) >= 1 ||
        getAmount(inventory, Items.BETTER_JOB) >= 1)
  ),
  new PlayerAction(
    'go to work',
    5,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 1 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 2 }));
      dispatch(addInventory({ name: Items.MONEY, amount: 2 }));
    },
    inventory => getAmount(inventory, Items.JOB) > 0
  ),
  new PlayerAction(
    'enjoy going to work',
    5,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 2 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 2 }));
      dispatch(addInventory({ name: Items.MONEY, amount: 4 }));
    },
    inventory => getAmount(inventory, Items.BETTER_JOB) > 0
  ),
  new PlayerAction(
    'love going to work',
    5,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 4 }));
      dispatch(addInventory({ name: Items.VACATION, amount: 2 }));
      dispatch(addInventory({ name: Items.MONEY, amount: 8 }));
    },
    inventory => getAmount(inventory, Items.AMAZING_JOB) > 0
  ),
  new PlayerAction(
    'buy food',
    1,
    [{ itemType: Items.MONEY, quantity: 1 }],
    (gameState, dispatch) => {
      dispatch(addInventory({ name: Items.FOOD, amount: 4 }));
    }
  ),
  new PlayerAction(
    'throw a massive party',
    3,
    [{ itemType: Items.FOOD, quantity: 5 }],
    (gameState, dispatch) => {
      const friendCount = getAmount(gameState.inventory, Items.FRIEND);
      if (friendCount > 0) {
        dispatch(
          addScore({ scoreType: ScoreType.FRIENDSHIP, amount: friendCount + 1 })
        );
        dispatch(addInventory({ name: Items.SOCIAL, amount: friendCount * 5 }));
        dispatch(addToLog('The party was off the chain.'));
      } else if (getAmount(gameState.inventory, Items.LOVER) > 0) {
        dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 2 }));
        dispatch(addInventory({ name: Items.SOCIAL, amount: 1 }));
        dispatch(addToLog('The party was just you and your SO.'));
      } else if (getAmount(gameState.inventory, Items.SPOUSE) > 0) {
        dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 2 }));
        dispatch(addInventory({ name: Items.SOCIAL, amount: 1 }));
        dispatch(addToLog('The party was just you and your spouse.'));
      } else {
        dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 1 }));
        dispatch(addToLog('No one came to your party'));
      }
    },
    inventory => getAmount(inventory, Items.FOOD) >= 5
  ),
  new PlayerAction(
    'attend school',
    7,
    [{ itemType: Items.MONEY, quantity: 5 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.LEARNING, amount: 2 }));
      dispatch(addInventory({ name: Items.EDUCATION, amount: 1 }));
    },
    inventory => getAmount(inventory, Items.MONEY) >= 1
  ),
  new PlayerAction(
    'quit your job',
    1,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.LEISURE, amount: 1 }));
      dispatch(removeInventory({ name: Items.JOB, amount: 1000 }));
      dispatch(removeInventory({ name: Items.BETTER_JOB, amount: 1000 }));
      dispatch(removeInventory({ name: Items.AMAZING_JOB, amount: 1000 }));
    },
    inventory =>
      getAmount(inventory, Items.JOB) >= 1 ||
      getAmount(inventory, Items.BETTER_JOB) >= 1 ||
      getAmount(inventory, Items.AMAZING_JOB) >= 1
  ),
  new PlayerAction('make a friend', 7, [], (gameState, dispatch) => {
    dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 1 }));
    dispatch(addInventory({ name: Items.FRIEND, amount: 1 }));
    dispatch(addInventory({ name: Items.SOCIAL, amount: 4 }));
    dispatch(addToLog('You meet someone you enjoy hanging out with'));
  }),
  new PlayerAction(
    'hang out with friends',
    1,
    [],
    (gameState, dispatch) => {
      const friendCount = getAmount(gameState.inventory, Items.FRIEND);
      dispatch(
        addScore({ scoreType: ScoreType.FRIENDSHIP, amount: friendCount })
      );
      dispatch(addInventory({ name: Items.SOCIAL, amount: friendCount * 2 }));
    },
    inventory => getAmount(inventory, Items.FRIEND) >= 1
  ),
  new PlayerAction(
    'go on a date',
    1,
    [{ itemType: Items.MONEY, quantity: 1 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 1 }));
      dispatch(addInventory({ name: Items.LOVER, amount: 1 }));
      dispatch(addInventory({ name: Items.SOCIAL, amount: 2 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 4 }));
      dispatch(addToLog('You meet someone and it gets serious fast!'));
    },
    inventory =>
      getAmount(inventory, Items.LOVER) < 1 &&
      getAmount(inventory, Items.SPOUSE) < 1
  ),
  new PlayerAction(
    'go on a date with your SO',
    1,
    [{ itemType: Items.MONEY, quantity: 2 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 1 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 2 }));
    },
    inventory => getAmount(inventory, Items.LOVER) >= 1
  ),
  new PlayerAction(
    'get married',
    1,
    [
      { itemType: Items.LOVE, quantity: 10 },
      { itemType: Items.MONEY, quantity: 1 },
    ],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FAMILY, amount: 10 }));
      dispatch(addInventory({ name: Items.SPOUSE, amount: 1 }));
      dispatch(removeInventory({ name: Items.LOVER, amount: 1 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 10 }));
      dispatch(addToLog('You get married'));
    },
    inventory =>
      getAmount(inventory, Items.LOVER) >= 1 &&
      getAmount(inventory, Items.LOVE) >= 5
  ),
  new PlayerAction(
    'get married in an extravagant way',
    3,
    [
      { itemType: Items.LOVE, quantity: 10 },
      { itemType: Items.MONEY, quantity: 10 },
    ],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FAMILY, amount: 10 }));
      dispatch(addInventory({ name: Items.SPOUSE, amount: 1 }));
      dispatch(removeInventory({ name: Items.LOVER, amount: 1 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 50 }));
      dispatch(addToLog('You get married and the ceremony was amazing'));
    },
    inventory =>
      getAmount(inventory, Items.LOVER) >= 1 &&
      getAmount(inventory, Items.LOVE) >= 5
  ),
  new PlayerAction(
    'spend some time with the spouse',
    2,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FAMILY, amount: 2 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 5 }));
    },
    inventory => getAmount(inventory, Items.SPOUSE) >= 1
  ),
  new PlayerAction(
    'have a kid (magically)',
    5,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FAMILY, amount: 5 }));
      dispatch(addInventory({ name: Items.LOVE, amount: 5 }));
      dispatch(addInventory({ name: Items.KID, amount: 1 }));
      dispatch(addInventory({ name: Items.FAMILY, amount: 10 }));
      dispatch(
        addToLog(
          "You have a kid. It has a name, but you can't ever remember it."
        )
      );
    },
    inventory => getAmount(inventory, Items.SPOUSE) >= 1
  ),
  new PlayerAction(
    'spend time with family',
    5,
    [],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FAMILY, amount: 2 }));
      dispatch(addInventory({ name: Items.FAMILY, amount: 10 }));
    },
    inventory => getAmount(inventory, Items.KID) >= 1
  ),
];

export default actions;
