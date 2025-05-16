import { transformUsers } from '../transformers';

export const getUser = async (loginToFind) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users?login=${loginToFind}`
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const users = await response.json();
    if (!users.length) return null;

    const user = users[0];
    return transformUsers(user);
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error;
  }
};
