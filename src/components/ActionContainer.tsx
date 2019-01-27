import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PlayerAction } from '../data/PlayerAction';
import {
  getActiveAction,
  getActiveActions,
  getInventory,
} from '../gameState/gameSelectors';
import {
  ActionItem,
  ActionList,
  ActionName,
  ActionPerform,
  ActionPerformBox,
  HasEnough,
  NotEnough,
} from './styled/actions';
import { RootState } from '../store';
import gameState from '../gameState/gameState';
import { GameState, InventoryType } from '../gameState/gameReducer';
import ProgressBar from './ProgressBar';
import { removeInventory, setActiveAction } from '../gameState/gameActions';

interface Props {
  dispatch: Dispatch;
  gameState: GameState;
  inventory: InventoryType;
  actions: PlayerAction[];
  activeAction: PlayerAction | null;
}

class ActionContainer extends React.Component<Props> {
  progress = React.createRef<ProgressBar>();
  progressText = React.createRef<HTMLElement>();
  daysLeft = 0;

  componentDidMount() {
    gameState.registerListener(this.tick);
  }

  componentWillUnmount() {
    gameState.unregisterListener(this.tick);
  }

  private tick = () => {
    const { activeAction } = this.props;
    if (activeAction === null) {
      return;
    }

    const action = activeAction as PlayerAction;

    this.daysLeft -= 1;
    if (this.progress.current) {
      const progress = 1.0 - this.daysLeft / action.days;
      this.progress.current.setProgress(progress);
      if (this.progressText.current) {
        this.progressText.current.innerText = `${(progress * 100).toFixed(0)}%`;
      }
    }

    if (this.daysLeft <= 0) {
      const { gameState, dispatch } = this.props;
      action.effects(gameState, dispatch);
      dispatch(setActiveAction(null));
    }
  };

  private activateAction = (action: PlayerAction) => {
    this.daysLeft = action.days;
    this.props.dispatch(setActiveAction(action));
    const { dispatch } = this.props;
    action.prerequisites.forEach(prereq => {
      dispatch(
        removeInventory({ name: prereq.itemType, amount: prereq.quantity })
      );
    });
  };

  private buildActionName(action: PlayerAction) {
    const { inventory } = this.props;
    return (
      <span>
        {action.name}{' '}
        {action.prerequisites.map(prereq => {
          const amount = inventory[prereq.itemType] || 0;
          const hasEnough = amount >= prereq.quantity;
          if (!hasEnough) {
            return (
              <NotEnough key={prereq.itemType}>
                [{prereq.quantity}&nbsp;{prereq.itemType}]
              </NotEnough>
            );
          }
          return (
            <HasEnough key={prereq.itemType}>
              [{prereq.quantity}&nbsp;{prereq.itemType}]
            </HasEnough>
          );
        })}
      </span>
    );
  }

  private buildActionButton(action: PlayerAction) {
    const { activeAction } = this.props;
    if (activeAction === action) {
      return (
        <ActionPerformBox>
          <ProgressBar ref={this.progress}>
            <span ref={this.progressText}>0%</span>
          </ProgressBar>
        </ActionPerformBox>
      );
    }

    const { inventory } = this.props;
    let message: string | undefined = !!activeAction
      ? 'Job in progress'
      : undefined;
    const isValid = action.prerequisites.reduce((result, prereq) => {
      if (!result) {
        return result;
      }
      const amount = inventory[prereq.itemType] || 0;
      const hasEnough = amount >= prereq.quantity;
      if (!hasEnough) {
        message = `Not enough ${prereq.itemType}`;
      }
      return hasEnough;
    }, true);

    return (
      <ActionPerform
        title={message}
        disabled={!isValid || !!activeAction}
        onClick={() => this.activateAction(action)}
      >
        Perform
      </ActionPerform>
    );
  }

  render() {
    const { actions } = this.props;
    return (
      <ActionList>
        {actions.map(item => (
          <ActionItem key={item.name}>
            <ActionName>{this.buildActionName(item)}</ActionName>
            {this.buildActionButton(item)}
          </ActionItem>
        ))}
      </ActionList>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  actions: getActiveActions(state),
  inventory: getInventory(state),
  gameState: state.game,
  activeAction: getActiveAction(state),
});

export default connect(mapStateToProps)(ActionContainer);
