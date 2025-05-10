export const transformUsers = (dbUsers) => ({
  id: dbUsers.id,
  login: dbUsers.login,
  password: dbUsers.password,
  registeredAt: dbUsers.registed_at,
  roleId: dbUsers.role_id,
});
