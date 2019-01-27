import * as React from 'react';
import gameState, { maxYears, startAge } from '../gameState/gameState';
import { TimeItem, TimeName, TimeQuantity } from './styled/layout';
import ProgressBar from './ProgressBar';

class AgeDisplay extends React.Component {
  readonly age = React.createRef<HTMLElement>();
  readonly progress = React.createRef<ProgressBar>();

  componentDidMount() {
    gameState.registerListener(this.onTick);
  }

  private onTick = () => {
    if (this.progress.current) {
      const progress = (gameState.age - startAge) / (maxYears - startAge);
      this.progress.current.setProgress(progress);
    }

    if (this.age.current) {
      this.age.current.innerText = gameState.age.toString();
    }
  };

  render() {
    return (
      <TimeItem>
        <TimeName>Current Age</TimeName>
        <TimeQuantity>
          <ProgressBar ref={this.progress} width={50}>
            <span ref={this.age}>0</span>y
          </ProgressBar>
        </TimeQuantity>
      </TimeItem>
    );
  }
}

export default AgeDisplay;
