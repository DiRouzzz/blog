export const getUsers = async () => {
  const requestUsers = await fetch('http://localhost:3000/users');
  const users = await requestUsers.json();
  return users;
};
