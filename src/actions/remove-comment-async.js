import { setPostData } from './set-post-data';

export const removeCommentAsync = (requestServer, postId, id) => {
  return async (dispatch) => {
    try {
      const postData = await requestServer('removePostComment', id, postId);
      dispatch(setPostData(postData.response));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };
};
