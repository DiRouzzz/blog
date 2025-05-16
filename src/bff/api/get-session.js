import { transformSession } from '../transformers';

export const getSession = async (hash) => {
  try {
    const response = await fetch(`http://localhost:3000/sessions?hash=${hash}`);

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const sessions = await response.json();

    if (!sessions.length) return null;

    const session = sessions[0];

    return session;
  } catch (error) {
    console.error('Ошибка при получении пользователя по хешу:', error);
    throw error;
  }
};
