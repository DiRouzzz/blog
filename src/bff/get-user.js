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

    const user = await response.json();

    return user.length ? user[0] : null;
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error;
  }
};
