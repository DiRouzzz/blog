import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => {
  return async (dispatch) => {
    try {
      const postData = await requestServer('fetchPost', postId);
      dispatch(setPostData(postData.response));
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error);
    }
  };
};
