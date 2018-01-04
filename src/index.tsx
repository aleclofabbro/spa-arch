import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, Props } from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {
  // Observable as Obs,
  Subject as Subj,
  BehaviorSubject as BSubj
} from '@reactivex/rxjs';

const isClickMsg = msg => msg[0] === 'click';
type ClickMsg = ['click'];

// const isClockMsg = msg => msg[0] === 'clock';
// type ClockMsg = ['clock', number];

type Msg = ClickMsg; // | ClockMsg;
const msgs$ = new Subj<Msg>();
const emit = (msg: Msg) => msgs$.next(msg);
// const x: Msg = ['clock'];
// const s = x[0];

msgs$
.filter(isClickMsg)
.subscribe(() => {
  props$.next({
    ...props$.value,
    nClicks: props$.value.nClicks + 1
  });
});

const props$ = new BSubj<Props>({
  username: 'nome',
  nClicks: 0,
  click: () => emit(['click'])
});

const updState$ = props$
  .auditTime(10)
  .merge(props$.debounceTime(10))
  .distinctUntilChanged();

updState$
  .subscribe(state => (
    ReactDOM.render(
      <App {...state}  />,
      document.getElementById('root') as HTMLElement
    )));

registerServiceWorker();

updState$.subscribe(console.log);

// Obs.interval(1)
//   .take(50)
//   .map(n => `Ciccio ${n.toFixed(2)}`)
//   .map(username => ({...props$.value, username: username.toUpperCase()}))
//   .subscribe(x => props$.next(x));