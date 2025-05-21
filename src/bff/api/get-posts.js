import { transformPost } from '../transformers';

export const getPosts = async (page, limit) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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

// export const getPosts = (page, limit) =>
//   fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`).then(
//     (loadedPosts) =>
//       Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]).then(
//         ([loadedPosts, links]) => ({
//           posts: loadedPosts && loadedPosts.map(transformPost),
//           links,
//         })
//       )
//   );
