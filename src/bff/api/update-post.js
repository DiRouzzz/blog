export const updatePost = async ({ id, imageUrl, title, content }) => {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      content,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка при изменение поста: ${response.status} - ${errorText}`
    );
  }

  return await response.json();
};
