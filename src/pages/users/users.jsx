import { Save, Trash2 } from 'lucide-react';
import { Content, H2 } from '../../components';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { useState, useEffect } from 'react';
import { getUsers, getRoles } from '../../bff/api';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const requestServer = useServerRequest();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersRes, rolesRes] = await Promise.all([
          requestServer('fetchUsers'),
          requestServer('fetchRoles'),
        ]);

        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
        } else {
          setUsers(usersRes.response);
          setRoles(rolesRes.response);
        }
      } catch (err) {
        setErrorMessage('Произошла ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestServer]);

  return (
    <div className={className}>
      <Content error={errorMessage}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                {users.map(({ id: userId, login, registeredAt, roleId }) => (
                  <Tr key={userId}>
                    <Td>{login}</Td>
                    <Td>{registeredAt}</Td>
                    <Td>
                      <StyledDiv>
                        <Dropdown defaultValue={roleId}>
                          {roles.map(({ id: idRole, name }) => (
                            <Option key={idRole} value={roleId}>
                              {name}
                            </Option>
                          ))}
                        </Dropdown>
                        <Save size={32} />
                        <Trash2 size={32} />
                      </StyledDiv>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Content>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  margin: auto;
  max-width: 800px;
  text-align: center;
`;
