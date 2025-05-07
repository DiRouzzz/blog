import { addUser } from './add-user';
import { getUser } from './get-user';
import { sessions } from './sessions';

export const server = {
  async logout(session) {
    sessions.remove(session);
  },
  async autorize(authLogin, authPassword) {
    const user = await getUser(authLogin);

    if (!user) {
      return {
        error: 'Пользователь не найден',
        response: null,
      };
    }

    if (user && authPassword !== user.password) {
      return {
        error: 'Неверный пароль',
        response: null,
      };
    }

    return {
      error: null,
      response: {
        session: sessions.create(user),
        id: user.id,
        login: user.login,
        roleId: user.role_id,
      },
    };
  },

  async register(regLogin, regPassword) {
    const userCheck = await getUser(regLogin);
    if (userCheck) {
      return {
        error: 'Такой логин уже занят',
        response: null,
      };
    }

    try {
      const user = await addUser(regLogin, regPassword);

      return {
        error: null,
        response: {
          session: sessions.create(user),
          id: user.id,
          login: user.login,
          roleId: user.role_id,
        },
      };
    } catch (e) {
      return {
        error: e.message || 'Неизвестная ошибка при регистрации',
        response: null,
      };
    }
  },
};
