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
type MsgTypes = ClickMsg | ClickIncMsg;
type Msg = MsgTypes;
const msgs$ = new Subj<Msg>();
const emit = (msg: Msg) => msgs$.next(msg);

const props$ = new BSubj<Props>({
  username: 'nome',
  nClicks: 0,
  click: () => emit(['click', 'clickInc'])
});

// TODO: mettere in 2 file esportare come funzioni generiche
// tipizzate con T(MsgTypes),
// argomenti props$, msgs$, e setters(basati su msg) dove si mod lo stato
// esportare MsgTypes input (ClickMsg | ClickIncMsg)
function isClickMsg(msg: MsgTypes): msg is ClickMsg {
  return (msg as ClickMsg)[0] === 'click';
}
type ClickMsg = ['click', string];

function isClickIncMsg(msg: MsgTypes): msg is ClickIncMsg {
  return (msg as ClickIncMsg) === 'clickInc';
}
type ClickIncMsg = 'clickInc';

msgs$
  .filter(msg => isClickIncMsg(msg))
  .subscribe((msg) => {
    props$.next({
      ...props$.value,
      nClicks: props$.value.nClicks + 1
    });
  });

msgs$
  .filter(msg => isClickMsg(msg))
  .delay(500)
  .subscribe((msg) => {
    msgs$.next((msg[1] as MsgTypes));
  });
// ODOT

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
updState$.subscribe(console.log);

registerServiceWorker();