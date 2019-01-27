import * as React from 'react';
import gameState from '../gameState/gameState';
import { TimeItem, TimeName, TimeQuantity } from './styled/layout';
import ProgressBar from './ProgressBar';

class WeekDisplay extends React.Component {
  readonly week = React.createRef<HTMLElement>();
  readonly progress = React.createRef<ProgressBar>();

  componentDidMount() {
    gameState.registerListener(this.onTick);
  }

  private onTick = () => {
    const dayOfWeek = gameState.days % 7;
    if (this.progress.current) {
      this.progress.current.setProgress(dayOfWeek / 6);
    }

    if (dayOfWeek === 0) {
      if (this.week.current) {
        const week = (gameState.days / 7) % 52;
        this.week.current.innerText = week.toString();
      }
    }
  };

  render() {
    return (
      <TimeItem>
        <TimeName>Current Week</TimeName>
        <TimeQuantity>
          <ProgressBar ref={this.progress}>
            <span ref={this.week}>0</span>
          </ProgressBar>
        </TimeQuantity>
      </TimeItem>
    );
  }
}

export default WeekDisplay;
