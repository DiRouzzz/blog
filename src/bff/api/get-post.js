import { transformPost } from '../transformers';

export const getPost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`);

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const post = await response.json();
  

    return transformPost(post);

    
  } catch (error) {
    console.error('Ошибка при получении поста:', error);
    throw error;
  }
};
