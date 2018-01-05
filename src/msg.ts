import {
  Observable as Obs,
  Subject as Subj
} from '@reactivex/rxjs';

export const Msgs$ = new Subj<Msg>();
export const emit = (msg: Msg) => Msgs$.next(msg);

// define CounterAddRndMsg
export type CounterAddRndType = 'CounterAddRnd';
export type CounterAddRndPayload = {id: string};
export type CounterAddRndMsg = [CounterAddRndType, CounterAddRndPayload];
// tslint:disable-next-line:max-line-length
export function isCounterAddRndMsg(msg: Msg): msg is CounterAddRndMsg { return (msg as CounterAddRndMsg)[0] === 'CounterAddRnd'; }
// tslint:disable-next-line:max-line-length
export const CounterAddRndMsg$ = (Msgs$.filter(msg => isCounterAddRndMsg(msg)).map(msg => msg[1]) as Obs<CounterAddRndPayload>);
// end define CounterAddRndMsg

// define IncMsg
export type IncType = 'Inc';
export type IncPayload = {incBy: number, id: string};
export type IncMsg = [IncType, IncPayload];
export function isIncMsg(msg: Msg): msg is IncMsg { return (msg as IncMsg)[0] === 'Inc'; }
export const IncMsg$ = (Msgs$.filter(msg => isIncMsg(msg)).map(msg => msg[1]) as Obs<IncPayload>);
// end define IncMsg

// define AddCounterMsg
export type AddCounterType = 'AddCounter';
export type AddCounterPayload = {id?: string};
export type AddCounterMsg = [AddCounterType, AddCounterPayload];
export function isAddCounterMsg(msg: Msg): msg is AddCounterMsg { return (msg as AddCounterMsg)[0] === 'AddCounter'; }
export const AddCounterMsg$ = (Msgs$.filter(msg => isAddCounterMsg(msg)).map(msg => msg[1]) as Obs<AddCounterPayload>);
// end define AddCounterMsg

export type Msg = CounterAddRndMsg | IncMsg | AddCounterMsg;
export type MsgType = Msg[0];
