export const addSession = async (hash, user) => {
  const response = await fetch('http://localhost:3000/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      hash,
      user,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при добавлении сессии: ${response.status} - ${errorText}`
    );
  }
};
