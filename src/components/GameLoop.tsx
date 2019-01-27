import * as React from 'react';
import gameState from '../gameState/gameState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addToLog } from '../gameState/gameActions';
import { Column, Label } from './styled/layout';
import LogContainer from './LogContainer';
import { RootState } from '../store';
import {
  getActions,
  getInventory,
  getIsDead,
} from '../gameState/gameSelectors';
import { maintenance } from '../data/items';
import { InventoryType } from '../gameState/gameReducer';
import ScoreContainer from './ScoreContainer';

interface Props {
  dispatch: Dispatch;
  children: React.ReactNode;
  isDead: boolean;
  inventory: InventoryType;
}

interface State {
  started: boolean;
  ended: boolean;
}

class GameLoop extends React.Component<Props, State> {
  state = {
    started: false,
    ended: false,
  };

  private start() {
    this.props.dispatch(addToLog('You went home.'));
    setTimeout(this.loop, gameState.tickTime);
  }

  private loop = () => {
    gameState.tick(() => {
      const { inventory, dispatch } = this.props;
      // Week maintenance
      Object.keys(maintenance).forEach(type => {
        if (inventory[type] > 0) {
          maintenance[type](inventory, dispatch, inventory[type]);
        }
      });
    });

    if (!gameState.dead && !this.props.isDead) {
      setTimeout(this.loop, gameState.tickTime);
    } else {
      this.props.dispatch(addToLog('You died.'));
      this.setState({ ended: true });
    }
  };

  private onClickStart = () => {
    this.setState({ started: true });
    this.start();
  };

  render() {
    if (this.state.ended) {
      return (
        <Column grow={0}>
          <span>You are dead.</span>
          <Label>Recently...</Label>
          <LogContainer />
          <Label>Priorities</Label>
          <ScoreContainer />
        </Column>
      );
    }

    if (this.state.started) {
      return this.props.children;
    }

    return <button onClick={this.onClickStart}>I am Home</button>;
  }
}

const mapStateToProps = (state: RootState) => ({
  isDead: getIsDead(state),
  actions: getActions(state),
  inventory: getInventory(state),
});

export default connect(mapStateToProps)(GameLoop);
