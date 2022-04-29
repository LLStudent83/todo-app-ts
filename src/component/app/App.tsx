/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  useState, useCallback,
} from 'react';
import { nanoid } from 'nanoid';
import TodoList from '../todoList/TodoList';
import AddTodo from '../addTodos/AddTodos';
import Context from '../../context';
import FilterTodo from '../filterTodo/FilterTodo';
import './app.scss';

type TodoType = {
  id: string
  completed: boolean
  title: string
  visible: boolean
};

// const AddTodo = React.lazy(() => import('../addTodos/AddTodos'));

function App(): JSX.Element {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [activeFilter,
    setActiveFilter] = useState<'all' | 'unComplete' | 'complete'>('all');

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map((todo: TodoType) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    );
  };

  function removeTodo(id: string): void {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function addTodo(title: string): void {
    setTodos(
      todos.concat({
        id: nanoid(),
        completed: false,
        title,
        visible: (activeFilter !== 'complete'),

      }),
    );
  }

  function filterTodo(value: 'all' | 'unComplete' | 'complete'): void {
    if (value === 'all') {
      setTodos((prevTodos) => prevTodos.map((todo) => (
        Object.defineProperty(todo, 'visible', { value: true })
      )));
    }
    if (value === 'unComplete') {
      setTodos((prevTodos) => prevTodos.map((todo) => (
        todo.completed ? Object.defineProperty(
          todo,
          'visible',
          { value: false },
        )
          : Object.defineProperty(todo, 'visible', { value: true }))));
    }
    if (value === 'complete') {
      setTodos((prevTodos) => prevTodos.map((todo) => (
        todo.completed ? Object.defineProperty(
          todo,
          'visible',
          { value: true },
        )
          : Object.defineProperty(todo, 'visible', { value: false }))));
    }
  }

  function onFilter(value: 'all' | 'unComplete' | 'complete'): void {
    if (value === activeFilter) return;
    setActiveFilter(value);
    filterTodo(value);
  }

  const memoRemoveTodo = useCallback(
    (id: string) => {
      removeTodo(id);
    },
    [],
  );

  return (
    <Context.Provider value={{ memoRemoveTodo }}>
      <div className="wrapper">
        <h1>Список задач</h1>
        <AddTodo onCreate={(title) => addTodo(title)} />
        <FilterTodo
          onFilter={(value: 'all' | 'unComplete' | 'complete') => {
            onFilter(value);
          }}
          activeFilter={activeFilter}
        />
        {todos.length !== 0 ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (<p>No todo</p>)}
      </div>
    </Context.Provider>
  );
}

export default App;
export type { TodoType };
