import {
  register,
  autorize,
  logout,
  fetchRoles,
  fetchUsers,
  updateUserRole,
  removeUser,
} from './operations';

export const server = {
  autorize,
  logout,
  register,
  fetchUsers,
  fetchRoles,
  updateUserRole,
  removeUser,
};
