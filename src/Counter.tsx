import * as React from 'react';

export interface Props {
  lastAdded: number;
  sum: number;
  click: () => void;
}

export const Counter = (props: Props) => (
  <fieldset>
    <h2>sum, {props.sum}</h2>
    <h2>lastAdded, {props.lastAdded}</h2>
    <button onClick={props.click}>click</button>
  </fieldset>
);