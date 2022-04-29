/* eslint-disable import/no-cycle */
import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import { TodoType } from '../app/App';
import './todoList.scss';

type Props = {
  todos: Array<TodoType>
  onToggle: (id: string) => void
};

function TodoList(props: Props): JSX.Element {
  const { todos, onToggle } = props;
  const visibleTodos: Array<TodoType> = todos.filter((todo) => todo.visible);

  return (
    <ul className="todoList__list">
      {visibleTodos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          index={index}
          onChange={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
