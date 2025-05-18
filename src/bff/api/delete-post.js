export const deletePost = async (postId) => {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при удалении статьи: ${response.status} - ${errorText}`
    );
  }
};
