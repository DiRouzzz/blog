import styled from 'styled-components';
import { CodeXml } from 'lucide-react';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const LogoTextBlog = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const LogoTextWeb = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <Icon margin="0 10px 0 0">
      <CodeXml size={100} />
    </Icon>
    <div>
      <LogoTextBlog>Блог</LogoTextBlog>
      <LogoTextWeb>Веб-разработчика</LogoTextWeb>
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  align-items: center;
  margin-top: -15px;
  text-decoration: none;
  color: #000;
`;
