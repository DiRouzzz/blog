export const removePostAsync = (requestServer, id) => {
  return async () => {
    try {
      const postData = await requestServer('removePost', id);
      return postData;
    } catch (error) {
      console.error('Ошибка при удалении статьи:', error);
    }
  };
};
