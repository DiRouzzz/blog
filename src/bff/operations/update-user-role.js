import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = (userSession, userId, newUserRoleId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: 'Доступ запрещен',
      response: null,
    };
  }
  setUserRole(userId, newUserRoleId);
  console.log('Успешно изменен!', userId);

  return {
    error: null,
    response: true,
  };
};
