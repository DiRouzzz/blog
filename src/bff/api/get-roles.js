export const getRoles = async () => {
  try {
    const response = await fetch('http://localhost:3000/roles');

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const roles = await response.json();
    return roles;
  } catch (error) {
    console.error('Ошибка при получении ролей:', error);
    throw error;
  }
};
