import * as React from 'react';
import styled from 'styled-components';

const InventoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const InventoryItem = styled.div`
  list-style-type: none;
  display: flex;
  min-height: 24px;
  align-items: center;
`;

const InventoryQuantity = styled.div`
  font-weight: 400;
  color: #263427;
  flex-grow: 1;
  flex-basis: 50px;
`;

const InventoryName = styled.div`
  font-weight: 500;
  color: #242c34;
  flex-grow: 6;
  flex-basis: 300px;
`;

export { InventoryList, InventoryItem, InventoryName, InventoryQuantity };
