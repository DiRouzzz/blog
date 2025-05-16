import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useEffect, useState } from 'react';
import { Input, Button, H2, AuthFormError } from '../../components';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { ROLE } from '../../constants';

const regFormSchema = yup.object().shape({
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
  passwordRepeat: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { roleId } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passwordRepeat: '',
    },
    resolver: yupResolver(regFormSchema),
  });

  // useEffect(() => {
  //   let currentWasLogout = store.getState().app.wasLogout;

  //   return Store.subscribe(() => {
  //     let previousWasLogout = currentWasLogout;
  //     currentWasLogout = store.getState().app.wasLogout;

  //     if (currentWasLogout !== previousWasLogout) {
  //       reset();
  //     }
  //   });
  // }, [reset, store]);

  // if (roleId !== ROLE.GUEST) {
  //   return <Navigate to="/" />; 7 этап время 30:27
  // }

  const onSubmit = ({ login, password }) => {
    server.register(login, password).then(({ error, response }) => {
      if (error) {
        setServerError(`Ошибка при регистрации: ${error}`);
        return;
      }
      dispatch(setUser(response));
      sessionStorage.setItem('userData', JSON.stringify(response));

      reset();
      navigate('/');
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passwordRepeat?.message;

  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <H2>Регистрация</H2>
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
        <Input
          type="password"
          placeholder="Повторите пароль..."
          {...register('passwordRepeat', {
            onChange: () => setServerError(''),
          })}
        />

        <Button type="submit" disabled={!!errorMessage}>
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
