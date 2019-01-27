import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getLog } from '../gameState/gameSelectors';
import { LogEntry } from '../gameState/gameReducer';

interface Props {
  log: LogEntry[];
}

const LogContainer = ({ log }: Props) => (
  <div>
    {log.map(entry => (
      <div key={entry.id}>{entry.line}</div>
    ))}
  </div>
);

const mapStateToProps = (state: RootState) => ({
  log: getLog(state),
});

export default connect(mapStateToProps)(LogContainer);
