import * as React from 'react';
import { Counter, Props as CounterProps } from './Counter';
import './App.css';

type CounterPropsId = (CounterProps & {id: string});
export type Props = {
  username: string;
  counters: CounterPropsId[];
  addCounter: () => void;
};

const logo = require('./logo.svg');

export const App = (props: Props) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>Welcome {props.username}</h2>
      <button onClick={props.addCounter}>add Counter</button>
    </div>
    {
      props.counters.map(counter => (
        <Counter key={counter.id} {...counter}/>
      ))
    }
  </div>
);
