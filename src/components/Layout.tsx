import * as React from 'react';
import InventoryContainer from './InventoryContainer';
import { StyledRoot, Column, Label } from './styled/layout';

import GameLoop from './GameLoop';
import WeekDisplay from './WeekDisplay';
import AgeDisplay from './AgeDisplay';
import ActionContainer from './ActionContainer';
import LogContainer from './LogContainer';

const Layout = () => (
  <StyledRoot>
    <GameLoop>
      <Column grow={2}>
        <Label>Time</Label>
        <WeekDisplay />
        <AgeDisplay />
        <Label>Recently</Label>
        <LogContainer />
      </Column>
      <Column grow={5}>
        <Label>Actions</Label>
        <ActionContainer />
      </Column>
      <Column grow={1}>
        <Label>You Have</Label>
        <InventoryContainer />
      </Column>
    </GameLoop>
  </StyledRoot>
);

export default Layout;
