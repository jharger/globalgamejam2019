import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getInventory } from '../gameState/gameSelectors';
import { InventoryType } from '../gameState/gameReducer';
import { ItemTypes } from '../gameState/itemTypes';

interface Props {
  inventory: InventoryType;
}

const InventoryContainer = ({ inventory }: Props) => (
  <div>
    {Object.keys(inventory).map(item => (
      <div>
        <div>{item}</div>
        <div>{(inventory as any)[item]}</div>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: RootState) => ({
  inventory: getInventory(state),
});

export default connect(mapStateToProps)(InventoryContainer);
