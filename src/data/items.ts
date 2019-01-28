import { InventoryType } from '../gameState/gameReducer';
import { Dispatch } from 'redux';
import {
  addToLog,
  killPlayer,
  removeInventory,
} from '../gameState/gameActions';

export enum Items {
  HOME = 'home',
  JOB = 'job',
  BETTER_JOB = 'better job',
  AMAZING_JOB = 'amazing job!',
  FOOD = 'food',
  MONEY = 'money',
  FRIEND = 'friend',
  /* Home improvements */
  TV = 'television',
  GAME_ROOM = 'game room',
  POOL = 'swimming pool',
  /* People  who eat*/
  LOVER = 'significant other',
  SPOUSE = 'spouse',
  KID = 'offspring',
  /* Points */
  LOVE = 'love points',
  FAMILY = 'family points',
  SOCIAL = 'social points',
  VACATION = 'work favor',
  EDUCATION = 'education points',
}

const getAmount = (inventory: InventoryType, itemType: string) =>
  inventory[itemType] || 0;

const consume = (
  inventory: InventoryType,
  dispatch: Dispatch,
  itemTypes: { [type: string]: number }
) => {
  let good = true;
  Object.keys(itemTypes).forEach(item => {
    const needed = itemTypes[item];
    if (getAmount(inventory, item) >= needed) {
      dispatch(removeInventory({ name: item, amount: needed }));
    } else {
      good = false;
    }
  });
  return good;
};

type MaintCallback = (
  inventory: InventoryType,
  dispatch: Dispatch,
  count: number
) => boolean;

const maintenance: { [type: string]: MaintCallback } = {
  [Items.HOME]: (inventory, dispatch) => {
    if (
      !consume(inventory, dispatch, {
        [Items.FOOD]: 1,
      })
    ) {
      dispatch(addToLog('You have starved'));
      dispatch(killPlayer());

      return false;
    }
    return true;
  },
  [Items.JOB]: (inventory, dispatch) => {
    if (
      !consume(inventory, dispatch, {
        [Items.VACATION]: 1,
      })
    ) {
      dispatch(addToLog('You have lost your job due to not working'));
      dispatch(removeInventory({ name: Items.JOB, amount: 1 }));
      return false;
    }
    return true;
  },
  [Items.BETTER_JOB]: (inventory, dispatch) => {
    if (
      !consume(inventory, dispatch, {
        [Items.VACATION]: 1,
      })
    ) {
      dispatch(addToLog('You have lost your good job due to not working'));
      dispatch(removeInventory({ name: Items.BETTER_JOB, amount: 1 }));
      return false;
    }
    return true;
  },
  [Items.AMAZING_JOB]: (inventory, dispatch) => {
    if (
      !consume(inventory, dispatch, {
        [Items.VACATION]: 1,
      })
    ) {
      dispatch(
        addToLog('You have lost your amazing job due to not actually working')
      );
      dispatch(removeInventory({ name: Items.AMAZING_JOB, amount: 1 }));
      return false;
    }
    return true;
  },
  [Items.LOVER]: (inventory, dispatch) => {
    if (
      !consume(inventory, dispatch, {
        [Items.LOVE]: 1,
      })
    ) {
      dispatch(addToLog('Your SO leaves you due to lack of attention.'));
      dispatch(removeInventory({ name: Items.LOVER, amount: 1 }));
      return false;
    }
    return true;
  },
  [Items.SPOUSE]: (inventory, dispatch) => {
    const kidCount = getAmount(inventory, Items.KID);
    if (
      !consume(inventory, dispatch, {
        [Items.LOVE]: 1,
      })
    ) {
      const kidCount = getAmount(inventory, Items.KID);
      if (kidCount > 0) {
        dispatch(
          addToLog(
            'Your spouse leaves (and takes the kids) you due to lack of attention.'
          )
        );
        dispatch(removeInventory({ name: Items.KID, amount: kidCount }));
      } else {
        dispatch(addToLog('Your spouse leaves you due to lack of attention.'));
      }
      dispatch(removeInventory({ name: Items.SPOUSE, amount: 1 }));
      return false;
    }
    if (
      kidCount > 0 &&
      !consume(inventory, dispatch, {
        [Items.FAMILY]: 1,
      })
    ) {
      const kidCount = getAmount(inventory, Items.KID);
      if (kidCount > 0) {
        dispatch(
          addToLog(
            'Your spouse leaves (and takes the kids) you due to you being a deadbeat.'
          )
        );
        dispatch(removeInventory({ name: Items.KID, amount: kidCount }));
      } else {
        dispatch(
          addToLog('Your spouse leaves you due to lack of family time.')
        );
      }
      dispatch(removeInventory({ name: Items.SPOUSE, amount: 1 }));
      return false;
    }
    if (
      !consume(inventory, dispatch, {
        [Items.FOOD]: 1,
      })
    ) {
      const kidCount = getAmount(inventory, Items.KID);
      if (kidCount > 0) {
        dispatch(
          addToLog(
            'Your spouse leaves (and takes the kids) you due to having no food around the house.'
          )
        );
        dispatch(removeInventory({ name: Items.KID, amount: kidCount }));
      } else {
        dispatch(addToLog('Your spouse leaves you due to lack food.'));
      }
      dispatch(removeInventory({ name: Items.SPOUSE, amount: 1 }));
      return false;
    }
    return true;
  },
  [Items.KID]: (inventory, dispatch, count) => {
    if (
      !consume(inventory, dispatch, {
        [Items.FOOD]: count,
      })
    ) {
      return false;
    }
    return true;
  },
  [Items.FRIEND]: (inventory, dispatch, count) => {
    if (
      !consume(inventory, dispatch, {
        [Items.SOCIAL]: count,
      })
    ) {
      dispatch(
        addToLog("Your friends leave because you don't spend time with them.")
      );
      dispatch(removeInventory({ name: Items.FRIEND, amount: count }));
      return false;
    }
    return true;
  },
};

export { maintenance };
