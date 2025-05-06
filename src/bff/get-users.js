export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};
