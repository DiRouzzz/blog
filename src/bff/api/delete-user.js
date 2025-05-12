export const deleteUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при удалении пользователя: ${response.status} - ${errorText}`
    );
  }
};
