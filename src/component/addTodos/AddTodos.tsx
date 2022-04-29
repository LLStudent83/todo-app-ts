import * as React from 'react';
import { useState } from 'react';
import './addTodos.scss';

function AddTodo({ onCreate }: { onCreate: (title: string) => void })
  : JSX.Element {
  const [stateInput, setStateInput] = useState('');
  function hendleChangeInput(value: string):void {
    setStateInput(value);
  }

  function submitHendler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (stateInput.trim().length > 0) {
      onCreate(stateInput);
      setStateInput('');
    }
  }

  return (
    <form className="addTodo_form" onSubmit={submitHendler}>
      <input
        type="text"
        value={stateInput}
        onChange={(e) => hendleChangeInput(e.target.value)}
      />
      <button className="addTodo_button" type="submit">
        Add todo
      </button>
    </form>
  );
}

export default AddTodo;
