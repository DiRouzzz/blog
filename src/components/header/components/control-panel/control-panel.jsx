import styled from 'styled-components';
import { Icon, Button } from '../../../../components';
import { ChevronsLeft, FileText, Users, ArrowBigRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  gap: 10px;

  & > svg {
    cursor: pointer;
  }
`;

const ControlPanelContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roleId, login, session } = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem('userData');
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <Logout>
            <div>{login}</div>
            <ArrowBigRight size={30} onClick={onLogout} />
          </Logout>
        )}
      </RightAligned>
      <RightAligned>
        <Icon margin="10px -5px 10px 10px">
          <IconWrapper>
            <ChevronsLeft size={40} onClick={() => navigate(-1)} />
            {isAdmin && (
              <>
                <Link to="/post">
                  <FileText size={30} />
                </Link>
                <Link to="/users">
                  <Users size={30} />
                </Link>
              </>
            )}
          </IconWrapper>
        </Icon>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
