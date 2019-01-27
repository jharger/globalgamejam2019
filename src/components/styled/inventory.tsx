import * as React from 'react';
import styled from 'styled-components';

const InventoryList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const InventoryItem = styled.li`
  list-style-type: none;
  display: flex;
`;

const InventoryQuantity = styled.div`
  font-weight: 400;
  color: #263427;
  flex-grow: 1;
`;

const InventoryName = styled.div`
  font-weight: 500;
  color: #242c34;
  flex-grow: 6;
`;

export { InventoryList, InventoryItem, InventoryName, InventoryQuantity };
