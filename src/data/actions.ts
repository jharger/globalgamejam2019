import { PlayerAction } from './PlayerAction';
import { addInventory, addScore, addToLog } from '../gameState/gameActions';
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
      dispatch(addScore({ scoreType: ScoreType.WEALTH, amount: 1 }));
      dispatch(addInventory({ name: Items.JOB, amount: 1 }));
    },
    inventory => getAmount(inventory, Items.JOB) < 1
  ),
  new PlayerAction(
    'throw a massive party',
    7,
    [{ itemType: Items.FOOD, quantity: 5 }],
    (gameState, dispatch) => {
      dispatch(addScore({ scoreType: ScoreType.FRIENDSHIP, amount: 1 }));
      dispatch(addToLog('No one came to your party'));
    },
    inventory => getAmount(inventory, Items.FOOD) >= 5
  ),
];

export default actions;
