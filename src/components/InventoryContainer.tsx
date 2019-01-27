import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getInventory } from '../gameState/gameSelectors';
import { InventoryType } from '../gameState/gameReducer';
import { ItemTypes } from '../data/itemTypes';
import {
  InventoryItem,
  InventoryList,
  InventoryName,
  InventoryQuantity,
} from './styled/inventory';

interface Props {
  inventory: InventoryType;
}

const InventoryContainer = ({ inventory }: Props) => (
  <InventoryList>
    {Object.keys(inventory).map(item => (
      <InventoryItem key={item}>
        <InventoryQuantity>{(inventory as any)[item]}</InventoryQuantity>
        <InventoryName>{item}</InventoryName>
      </InventoryItem>
    ))}
  </InventoryList>
);

const mapStateToProps = (state: RootState) => ({
  inventory: getInventory(state),
});

export default connect(mapStateToProps)(InventoryContainer);
