import { ItemTypes } from './itemTypes';

export interface Cost {
  itemType: ItemTypes;
  quantity: number;
}

class PlayerAction {
  readonly name: string;
  readonly costs: Cost[];

  constructor(name: string, costs: Cost[]) {
    this.name = name;
    this.costs = costs;
  }
}
