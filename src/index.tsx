import { ClickMsg$, IncMsg$, Msg, Msgs$, emit } from './msg';
import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, Props } from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BehaviorSubject as BSubj
} from '@reactivex/rxjs';

const props$ = new BSubj<Props>({
  username: 'nome',
  sum: 0,
  lastAdded: 0,
  click: () => emit(['Click', {ret: 'Inc'}])
});

const updState$ = props$
  .auditTime(10)
  .merge(props$.debounceTime(10))
  .distinctUntilChanged();

IncMsg$
  .subscribe(incBy => {
    props$.next({
      ...props$.value,
      lastAdded: incBy,
      sum: props$.value.sum + incBy
    });
  });

ClickMsg$
  .delay(500)
  .subscribe(payload => {
    const incBy = Math.floor(Math.random() * 10 + 1);
    const retMsgType = payload.ret;
    const retMsg = [retMsgType, incBy];
    Msgs$.next((retMsg as Msg));
  });

updState$
  .subscribe(state => (
    ReactDOM.render(
      <App {...state}  />,
      document.getElementById('root') as HTMLElement
    )));

updState$.subscribe(console.log);

registerServiceWorker();