import { transformComment } from '../transformers';

export const getComments = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments?post_id=${postId}`
    );

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
