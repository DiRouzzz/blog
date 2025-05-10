import {
  register,
  autorize,
  logout,
  fetchRoles,
  fetchUsers,
  updateUserRole,
} from './operations';

export const server = {
  autorize,
  logout,
  register,
  fetchUsers,
  fetchRoles,
  updateUserRole,
};
