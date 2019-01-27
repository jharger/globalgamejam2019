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
  FOOD = 'food',
  FRIEND = 'friend',
  /* People  who eat*/
  LOVER = 'lover',
  SPOUSE = 'spouse',
  KID = 'offspring',
  /* Points */
  LOVE = 'love points',
  FAMILY = 'family points',
  SOCIAL = 'family points',
  VACATION = 'weeks of vacation',
}

const getAmount = (inventory: InventoryType, itemType: Items) =>
  inventory[itemType] || 0;

type MaintCallback = (inventory: InventoryType, dispatch: Dispatch) => void;

const maintenance: { [type: string]: MaintCallback } = {
  [Items.HOME]: (inventory, dispatch) => {
    if (getAmount(inventory, Items.FOOD) >= 1) {
      dispatch(removeInventory({ name: Items.FOOD, amount: 1 }));
    } else {
      dispatch(addToLog('You have starved'));
      dispatch(killPlayer());
    }
  },
};

export { maintenance };
