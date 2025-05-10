import { getUser, addUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
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
};
