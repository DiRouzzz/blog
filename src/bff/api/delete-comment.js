export const deleteComment = async (commentId) => {
  const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при удалении комментария: ${response.status} - ${errorText}`
    );
  }
};
