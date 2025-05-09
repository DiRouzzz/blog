import { Save, Trash2 } from 'lucide-react';
import { H2 } from '../../components';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getUsers } from '../../bff/get-users';
import { getRoles } from '../../bff/get-roles';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 3px solid #ddd;
`;

const Th = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #4caf50;
  color: white;

  padding: 8px;
`;

const Td = styled.td`
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #ddd;
  }
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  max-width: 200px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Option = styled.option`
  padding: 8px 12px;
  background-color: white;
  color: #333;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }

  &:checked {
    background-color: #4caf50;
    color: white;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin-right: 20px;

  svg {
    cursor: pointer;
  }
`;

const Loader = styled.span`
  margin: 30% 0 50% 0;
  width: 48px;
  height: 48px;
  border: 5px solid #6ebeff;
  border-bottom-color: #337ab7;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const users = await getUsers();
      const roles = await getRoles();
      setUsers(users);
      setRoles(roles);
    };
    fetch();
  }, []);

  const onClickSave = (id) => {
    console.log(id);
  };

  const onClickRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении задачи');
      }

      console.log('Пользователь успешно удалена!');
      setUsers(users.filter((user) => user.id !== id));
      // dispatch(removeTodo({ id }));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      throw error;
    }
  };
  return (
    <div className={className}>
      <H2>Пользователи</H2>
      <Table>
        <thead>
          <tr>
            <Th>Логин</Th>
            <Th>Дата регистрации</Th>
            <Th>Роль</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id: userId, login, registed_at, role_id }) => (
            <Tr key={userId}>
              <Td>{login}</Td>
              <Td>{registed_at}</Td>
              <Td>
                <StyledDiv>
                  <Dropdown defaultValue={role_id}>
                    {roles.map(({ id: roleId, name }) => (
                      <Option key={roleId} value={roleId}>
                        {name}
                      </Option>
                    ))}
                  </Dropdown>
                  <Save size={32} onClick={() => onClickSave(userId)} />
                  <Trash2 size={32} onClick={() => onClickRemove(userId)} />
                </StyledDiv>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  margin: auto;
  max-width: 800px;
  text-align: center;
`;
