import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { ERROR } from '../../constants';

import { checkAccess } from '../../utils';
export const PrivateContent = ({ children, access, serverError = null }) => {
  const userRole = useSelector((state) => state.user.roleId);

  const accessError = checkAccess(access, userRole)
    ? null
    : ERROR.ACCESS_DENIED;

  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};
