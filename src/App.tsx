import * as React from 'react';
import './App.css';

export interface Props {
  username: string;
  nClicks: number;
  click: () => void;
}

const logo = require('./logo.svg');

export const App = (props: Props) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>Welcome to React, {props.username}</h2>
      <h2>nClick, {props.nClicks}</h2>
      <button onClick={props.click}>click</button>
    </div>
  </div>
);
