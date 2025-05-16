export const addComment = async (userId, postId, content) => {
  const response = await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
      content,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка регистрации: ${response.status} - ${errorText}`);
  }
};
