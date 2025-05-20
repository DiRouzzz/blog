import { transformComment } from '../transformers';

export const getComments = async (postId) => {
  const ALL_COMMENTS_URL = 'http://localhost:3000/comments';
  const POST_COMMENTS_URL = 'http://localhost:3000/comments?post_id=';

  const url =
    postId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL + postId;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const comments = await response.json();

    return comments.map(transformComment);
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    throw error;
  }
};
