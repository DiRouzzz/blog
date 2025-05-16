import { setPostData } from './set-post-data';

export const addCommentAsync = (requestServer, userId, postId, content) => {
  return async (dispatch) => {
    try {
      const postData = await requestServer(
        'addPostComment',
        userId,
        postId,
        content
      );
      dispatch(setPostData(postData.response));
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };
};
