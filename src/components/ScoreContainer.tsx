import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSortedScores } from '../gameState/gameSelectors';
import {
  InventoryItem,
  InventoryList,
  InventoryName,
  InventoryQuantity,
} from './styled/inventory';

interface Props {
  scores: { scoreType: string; amount: number }[];
}

const ScoreContainer = ({ scores }: Props) => (
  <InventoryList>
    {scores.map(item => (
      <InventoryItem key={item.scoreType}>
        <InventoryName>{item.scoreType}</InventoryName>
        <InventoryQuantity>{item.amount}</InventoryQuantity>
      </InventoryItem>
    ))}
  </InventoryList>
);

const mapStateToProps = (state: RootState) => ({
  scores: getSortedScores(state),
});

export default connect(mapStateToProps)(ScoreContainer);
