import styled from 'styled-components';
import { Logo } from './components/logo/logo';
import { ControlPanel } from './components/control-panel/control-panel';

const Discription = styled.div``;

export const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Discription>
      Веб-технологии
      <br /> Написание кода <br /> Разбор ошибок
    </Discription>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 1200px;
  height: 120px;
  padding: 20px 40px;
  box-shadow: rgb(0, 0, 0) 0px 2px 17px;
  background-color: white;
`;
