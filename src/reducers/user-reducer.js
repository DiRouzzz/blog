import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const inititalUserState = {
  session: null,
  id: null,
  login: null,
  roleId: ROLE.GUEST,
};

export const userReducer = (state = inititalUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPE.LOGOUT: {
      return inititalUserState;
    }
    default:
      return state;
  }
};
