import * as React from 'react';
import { Counter, Props as countProps } from './Counter';
import './App.css';

export interface Props {
  username: string;
  countA: countProps;
  countB: countProps;
  // click: () => void;
}

const logo = require('./logo.svg');

export const App = (props: Props) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>Welcome to React, {props.username}</h2>
    </div>
    <Counter {...props.countA} />
    <Counter {...props.countB} />
  </div>
);
