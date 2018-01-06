// tslint:disable:max-line-length
import {
  Observable as Obs,
  Subject as Subj
} from '@reactivex/rxjs';

export const Msgs$ = new Subj<Msg>();
export const emit = (msg: Msg) => Msgs$.next(msg);

// define CounterAddRndMsg
export type LetCounterAddRnd = {
  type: 'LetCounterAddRnd';
  payload: {id: string};
  msg: [LetCounterAddRnd['type'], LetCounterAddRnd['payload']];
};
export function isLetCounterAddRndMsg(msg: Msg): msg is LetCounterAddRnd['msg'] { return (msg as LetCounterAddRnd['msg'])[0] === 'LetCounterAddRnd'; }
// tslint:disable-next-line:max-line-length
export const LetCounterAddRndMsg$ = (Msgs$.filter(msg => isLetCounterAddRndMsg(msg)).map(msg => msg[1]) as Obs<LetCounterAddRnd['payload']>);
// end define CounterAddRndMsg

// define IncMsg
export type Inc = {
  type: 'Inc';
  payload: {incBy: number, id: string};
  msg: [Inc['type'], Inc['payload']];
};
export function isIncMsg(msg: Msg): msg is Inc['msg'] { return (msg as Inc['msg'])[0] === 'Inc'; }
export const IncMsg$ = (Msgs$.filter(msg => isIncMsg(msg)).map(msg => msg[1]) as Obs<Inc['payload']>);
// end define IncMsg

// define AddCounterMsg
export type AddCounter = {
  type: 'AddCounter';
  payload: {id?: string};
  msg: [AddCounter['type'], AddCounter['payload']];
};
export function isAddCounterMsg(msg: Msg): msg is AddCounter['msg'] { return (msg as AddCounter['msg'])[0] === 'AddCounter'; }
export const AddCounterMsg$ = (Msgs$.filter(msg => isAddCounterMsg(msg)).map(msg => msg[1]) as Obs<AddCounter['payload']>);
// end define AddCounterMsg

export type Msg = LetCounterAddRnd['msg'] | Inc['msg'] | AddCounter['msg'];
export type MsgType = Msg[0];
