import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => {
  return async (dispatch) => {
    try {
      const postData = await requestServer('fetchPost', postId);
      if (postData.response) {
        dispatch(setPostData(postData.response));
      }

      return postData;
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error);
    }
  };
};
