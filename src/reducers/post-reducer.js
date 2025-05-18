import { ACTION_TYPE } from '../actions/action-type';

const inititalPostState = {
  id: '',
  title: '',
  imageUrl: '',
  content: '',
  publishedAt: '',
  comments: [],
};

export const postReducer = (state = inititalPostState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_POST_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.RESET_POST_DATA:
      return inititalPostState;
    default:
      return state;
  }
};
