import { addUser } from './add-user';
import { createSession } from './create-session';
import { getUser } from './get-user';

export const server = {
  async autorize(authLogin, authPassword) {
    const user = getUser(authLogin);

    if (!user) {
      return {
        error: 'Пользователь не найден',
        response: null,
      };
    }

    if (authPassword !== userFind.password) {
      return {
        error: 'Неверный пароль',
        response: null,
      };
    }

    return {
      error: null,
      response: createSession(user.role_id),
    };
  },

  async register(regLogin, regPassword) {
    const user = getUser(authLogin);

    if (user) {
      return {
        error: 'Такой логин уже занят',
        response: null,
      };
    }

    await addUser(regLogin, regPassword);

    return {
      error: null,
      response: createSession(user.role_id),
    };
  },
};
