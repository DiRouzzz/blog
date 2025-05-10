import {
  register,
  autorize,
  logout,
  fetchRoles,
  fetchUsers,
} from './operations';

export const server = {
  autorize,
  logout,
  register,
  fetchUsers,
  fetchRoles,
};
