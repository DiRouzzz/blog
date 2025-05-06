import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import { Input, Button, H2 } from '../../components';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин.')
    .matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
    .min(3, 'Неверно заполнен логин. Нужно указать минимум 3 символа')
    .max(15, 'Неверно заполнен  логин. Можно указать максимум 15 символов'),
  password: yup
    .string()
    .required('Заполните пароль.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Неверно заполнен пароль. Пароль должен содержать минимум 8 символов, хотя бы одну букву и одну цифру'
    ),
});

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  background-color: #c07777;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  const onSubmit = ({ login, password }) => {
    server.autorize(login, password).then(({ error, response }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(response));
    });
    reset();
    navigate('/');
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passwordRepeat?.message;

  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register('login', { onChange: () => setServerError('') })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register('password', { onChange: () => setServerError('') })}
        />

        <Button type="submit">Авторизоваться</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
