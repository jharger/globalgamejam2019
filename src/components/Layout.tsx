import * as React from 'react';
import InventoryContainer from './InventoryContainer';
import { StyledRoot, Column, Label } from './styled/layout';

import GameLoop from './GameLoop';
import WeekDisplay from './WeekDisplay';
import AgeDisplay from './AgeDisplay';

const Layout = () => (
  <StyledRoot>
    <GameLoop>
      <Column grow={1}>
        <Label>Time</Label>
        <WeekDisplay />
        <AgeDisplay />
      </Column>
      <Column grow={3}>
        <Label>Actions</Label>
      </Column>
      <Column grow={2}>
        <Label>Inventory</Label>
        <InventoryContainer />
      </Column>
    </GameLoop>
  </StyledRoot>
);

export default Layout;
