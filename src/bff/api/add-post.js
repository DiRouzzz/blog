export const addPost = async ({ imageUrl, title, content }) => {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      content,
      published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка регистрации: ${response.status} - ${errorText}`);
  }

  return response.json();
};
