import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './type/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);

  const [selectedUser, setSelectedUser] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (todoTitle && selectedUser) {
      setTodos([
        ...todos,
        {
          id: Math.max(...todos.map((todo) => todo.id)) + 1,
          title: todoTitle,
          completed: false,
          userId: selectedUser,
        },
      ]);
      setSelectedUser(0);
      setTodoTitle('');
    }
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTodoTitle(event.target.value);
  };

  const userChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setSelectedUser(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Todo title"
            data-cy="titleInput"
            id="todo-title"
            value={todoTitle}
            onChange={titleChangeHandler}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={userChangeHandler}
            value={selectedUser}
          >
            <option value="0" selected>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
