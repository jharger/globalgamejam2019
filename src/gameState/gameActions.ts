import { createAction } from 'redux-actions';

const ADD_INVENTORY = 'ADD_INVENTORY';
const addInventory = createAction(
  ADD_INVENTORY,
  (payload: { name: string }) => payload
);

export { ADD_INVENTORY, addInventory };
