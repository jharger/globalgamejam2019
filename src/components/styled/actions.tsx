import * as React from 'react';
import styled from 'styled-components';

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionItem = styled.div`
  display: flex;
  min-height: 24px;
  align-items: center;
`;

const ActionName = styled.div`
  font-weight: 500;
  color: #242c34;
  flex-grow: 2;
  flex-basis: 200px;
`;

const ActionPerformBox = styled.div`
  flex-basis: 100px;
  flex-grow: 1;
`;

const HasEnough = styled.span`
  font-weight: 500;
  color: darkgreen;
`;

const NotEnough = styled.span`
  font-weight: 500;
  color: darkred;
`;

const ActionPerform = styled.button`
  font-weight: 400;
  color: #263427;
  border: 1px solid #888;
  background-color: #bbb;
  box-sizing: border-box;
  flex-basis: 100px;
  flex-grow: 1;
  height: 18px;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    background-color: #aaa;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    border-color: #bbb;
  }
`;

export {
  ActionItem,
  ActionList,
  ActionName,
  ActionPerformBox,
  ActionPerform,
  HasEnough,
  NotEnough,
};
