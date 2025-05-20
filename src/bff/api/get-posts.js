import { transformPost } from '../transformers';

export const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/posts');

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const posts = await response.json();
    return posts.map((post) => transformPost(post));
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
    throw error;
  }
};
