import {
  Observable as Obs,
  Subject as Subj
} from '@reactivex/rxjs';

export const Msgs$ = new Subj<Msg>();
export const emit = (msg: Msg) => Msgs$.next(msg);

// define ClickMsg
export type ClickType = 'Click';
export type ClickPayload = {ret: MsgType, ctx: string};
export type ClickMsg = [ClickType, ClickPayload];
export function isClickMsg(msg: Msg): msg is ClickMsg { return (msg as ClickMsg)[0] === 'Click'; }
export const ClickMsg$ = (Msgs$.filter(msg => isClickMsg(msg)).map(msg => msg[1]) as Obs<ClickPayload>);
// end define ClickMsg

// define IncMsg
export type IncType = 'Inc';
export type IncPayload = {incBy: number, ctx: string};
export type IncMsg = [IncType, IncPayload];
export function isIncMsg(msg: Msg): msg is IncMsg { return (msg as IncMsg)[0] === 'Inc'; }
export const IncMsg$ = (Msgs$.filter(msg => isIncMsg(msg)).map(msg => msg[1]) as Obs<IncPayload>);
// end define IncMsg

export type Msg = ClickMsg | IncMsg;
export type MsgType = Msg[0];
