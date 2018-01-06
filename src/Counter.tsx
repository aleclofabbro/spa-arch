import * as React from 'react';

export interface Props {
  lastAdded: number;
  sum: number;
  pendingAddReq: boolean;
  letCounterAddRnd: () => void;
}

export const Counter = (props: Props) => (
  <fieldset>
    <h2>sum, {props.sum}</h2>
    <h2>lastAdded, {props.lastAdded}</h2>
    <button
      disabled={props.pendingAddReq}
      onClick={props.letCounterAddRnd}
    >
        {props.pendingAddReq ? 'Wait' : 'addRnd'}
    </button>
    </fieldset>
  );
