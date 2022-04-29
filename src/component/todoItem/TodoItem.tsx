/* eslint-disable import/no-cycle */
import * as React from 'react';
import { useContext } from 'react';
import Context from '../../context';
import { TodoType } from '../app/App';

import './todoItem.scss';

type Props = {
  todo: TodoType
  index: number
  onChange: (id: string) => void
};

function TodoItem({ todo, index, onChange }: Props): JSX.Element {
  const { memoRemoveTodo } = useContext(Context);
  const classes = ['todoItem__todoTitle'];
  if (todo.completed) {
    classes.push('todoItem__done');
  }
  return (
    <li className="todoItem__item">
      <input
        className="todoItem__inputTodo"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onChange(todo.id)}
      />
      <div className="todoItem__serialТumber">{index + 1}</div>
      <div className={classes.join(' ')}>{todo.title}</div>

      <button
        type="button"
        className="todoItem__deleteTodo"
        onClick={() => memoRemoveTodo(todo.id)}
      >
        &times;
      </button>
    </li>
  );
}

export default TodoItem;
