import { GameState, InventoryType } from '../gameState/gameReducer';
import { Items } from './items';
import { Dispatch } from 'redux';

export interface Prerequisite {
  itemType: Items;
  quantity: number;
}

export type ThresholdPredicate = (inventory: InventoryType) => boolean;

export type EffectsCallback = (
  gameState: GameState,
  dispatch: Dispatch
) => void;

class PlayerAction {
  readonly name: string;
  readonly prerequisites: Prerequisite[];
  readonly effects: EffectsCallback;
  readonly days: number;
  readonly threshold: ThresholdPredicate | null;

  constructor(
    name: string,
    days: number,
    prerequisites: Prerequisite[],
    effects: EffectsCallback,
    threshold: ThresholdPredicate | null = null
  ) {
    this.name = name;
    this.days = days;
    this.prerequisites = prerequisites;
    this.effects = effects;
    this.threshold = threshold;
  }
}

export { PlayerAction };
