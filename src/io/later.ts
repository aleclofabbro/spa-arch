import { Observable } from '@reactivex/rxjs';
function later<T>(op: () => T) {
  return Observable.of(null).delay(Math.random() * 400 + 200).map(op) as Observable<T>;
}
export default later;
