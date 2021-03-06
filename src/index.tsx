// import { AddCounterMsg$, LetCounterAddRndMsg$, emit, IncMsg$, Msg, Msgs$ } from './msg/';
import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, Props } from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  Observable as Obs,
  BehaviorSubject as BSubj,
  Subject as Subj
} from '@reactivex/rxjs';
import uuid from './io/uuid';

const props$ = new BSubj<Props>({
  username: 'nome',
  counters: [],
  addCounter: () => addCounter$.next()
});

export const addCounter$ = new Subj<void>();
export const incCounter$ = new Subj<{incBy: number, id: string}>();
export const reqRndIncCounter$ = new Subj<{id: string}>();

const updState$ = props$
  .auditTime(10)
  .merge(props$.debounceTime(10))
  .distinctUntilChanged();

incCounter$
  .subscribe(({incBy, id}) => {
    props$.next({
      ...props$.value,
      counters: props$.value.counters.map(counter => {

        return counter.id !== id ? counter : {
          ...counter,
          lastAdded: incBy,
          sum: counter.sum + incBy
        };
      })
    });
  });

reqRndIncCounter$
  .subscribe(payload => {
    const incBy = Math.floor(Math.random() * 10 + 1);
    const id = payload.id;
    const retMsg = {incBy, id};
    props$.next({
      ...props$.value,
      counters: props$.value.counters.map(counter => {
        return counter.id !== id ? counter : {
          ...counter,
          pendingAddReq: true
        };
      })
    });
    Obs.interval(500 * Math.random() + 300)
      .take(1)
      .subscribe(() => {
        props$.next({
          ...props$.value,
          counters: props$.value.counters.map(counter => {
            return counter.id !== id ? counter : {
              ...counter,
              pendingAddReq: false
            };
          })
        });
        incCounter$.next(retMsg);
      });
  });

addCounter$
  .subscribe(() => {
    const _id = uuid();
    props$.next({
      ...props$.value,
      counters: props$.value.counters.concat([{
        lastAdded: 0,
        sum: 0,
        id: _id,
        pendingAddReq: false,
        letCounterAddRnd: () => reqRndIncCounter$.next({id: _id})
      }])
    });
  });

updState$
  .subscribe(state => (
    ReactDOM.render(
      <App {...state}  />,
      document.getElementById('root') as HTMLElement
    )));

updState$.subscribe(console.log);

registerServiceWorker();