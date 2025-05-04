import styled from 'styled-components';
import { Icon } from '../../../../components';
import { ChevronsLeft, FileText, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  margin: ${({ margin }) => margin || '0 5px'};
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #000;
  background-color: #eee;
  cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAligned>
        <StyledLink to="/login">Войти</StyledLink>
      </RightAligned>
      <RightAligned>
        <Icon margin="10px -5px 10px 10px">
          <IconWrapper>
            <ChevronsLeft size={40} onClick={() => navigate(-1)} />
          </IconWrapper>
          <IconWrapper margin="0 5px">
            <Link to="/post">
              <FileText size={30} />
            </Link>
          </IconWrapper>
          <IconWrapper margin="0 0 0 5px">
            <Link to="/users">
              <Users size={30} />
            </Link>
          </IconWrapper>
        </Icon>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
