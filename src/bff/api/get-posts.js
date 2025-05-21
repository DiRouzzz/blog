import { transformPost } from '../transformers';

export const getPosts = async (searchPhrase, page, limit) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const postsJson = await response.json();
    const links = response.headers.get('Link');

    return {
      posts: postsJson?.map(transformPost),
      links,
    };
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
    throw error;
  }
};
