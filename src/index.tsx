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
type MsgType = ClickType | IncType;
// type MsgPayload = ClickPayload | IncPayload;
type Msg = ClickMsg | IncMsg;

const msgs$ = new Subj<Msg>();
const emit = (msg: Msg) => msgs$.next(msg);

const props$ = new BSubj<Props>({
  username: 'nome',
  sum: 0,
  lastAdded: 0,
  click: () => emit(['click', {ret: 'inc'}])
});

// TODO: mettere in 2 file esportare come funzioni generiche
// tipizzate con T(Msg),
// argomenti props$, msgs$, e setters(basati su msg) dove si mod lo stato
// esportare Msg input (ClickMsg | IncMsg)

function isClickMsg(msg: Msg): msg is ClickMsg {
  return (msg as ClickMsg)[0] === 'click';
}
type ClickType = 'click';
type ClickPayload = {ret: MsgType};
type ClickMsg = [ClickType, ClickPayload];
msgs$
  .filter(msg => isClickMsg(msg))
  .delay(500)
  .subscribe((msg: ClickMsg) => {
    const incBy = Math.floor(Math.random() * 10 + 1);
    const retMsg = ([msg[1].ret, incBy] as Msg);
    msgs$.next(retMsg);
  });

/// ---

function isIncMsg(msg: Msg): msg is IncMsg {
  return (msg as IncMsg)[0] === 'inc';
}
type IncType = 'inc';
type IncPayload = number;
type IncMsg = [IncType, IncPayload];
msgs$
  .filter(msg => isIncMsg(msg))
  .subscribe((msg: IncMsg) => {
    props$.next({
      ...props$.value,
      lastAdded: msg[1],
      sum: props$.value.sum + msg[1]
    });
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