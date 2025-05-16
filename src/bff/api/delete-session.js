export const deleteSession = async (sessionId) => {
  const response = await fetch(`http://localhost:3000/sessions/${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при удалении пользователя: ${response.status} - ${errorText}`
    );
  }
};
