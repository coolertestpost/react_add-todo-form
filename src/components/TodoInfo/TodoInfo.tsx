import React from 'react';
import cn from 'classnames';

import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo';

import usersFromServer from '../../api/users';
import { User } from '../../type/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  function getUser(todoId: number): User | undefined {
    const foundedUser = usersFromServer.find((user) => {
      return user.id === todoId;
    });

    return foundedUser;
  }

  return (
    <article 
      data-id={todo.id} 
      className={
        cn('TodoInfo', { 'TodoInfo--completed': todo.completed })
      }
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={getUser(todo.userId)} />
    </article>
  );
};
