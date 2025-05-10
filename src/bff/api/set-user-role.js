export const setUserRole = async (userId, roleId) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      role_id: roleId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при изменение роли: ${response.status} - ${errorText}`
    );
  }

  return await response.json();
};
