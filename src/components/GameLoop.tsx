import * as React from 'react';
import gameState from '../gameState/gameState';

interface Props {
  children: React.ReactNode;
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
    setTimeout(this.loop, gameState.tickTime);
  }

  private loop = () => {
    gameState.tick();

    if (!gameState.dead) {
      setTimeout(this.loop, gameState.tickTime);
    } else {
      this.setState({ ended: true });
    }
  };

  private onClickStart = () => {
    this.setState({ started: true });
    this.start();
  };

  render() {
    if (this.state.ended) {
      return <div>You are dead.</div>;
    }

    if (this.state.started) {
      return this.props.children;
    }

    return <button onClick={this.onClickStart}>I am Home</button>;
  }
}

export default GameLoop;
