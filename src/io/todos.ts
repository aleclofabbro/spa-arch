import { collection } from './db';
export interface Todo {
  title: string;
  body: string;
}
const todos = collection<Todo>('todos');
export default todos;

todos.insert({
  title: 'rr',
  body: 'gg'
});

(window as any).todos = todos; // tslint:disable-line no-any