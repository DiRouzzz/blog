import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import { Header, Footer } from './components';

const Content = styled.div`
  padding: 120px 0;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  background-color: white;
`;

function App() {
  return (
    <AppColumn>
      <Header />
      <Content>
        <h1>Content</h1>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<div>Авторизация</div>} />
          <Route path="/register" element={<div>Регистрация</div>} />
          <Route path="/users" element={<div>Пользователи</div>} />
          <Route path="/post" element={<div>Новая статья</div>} />
          <Route path="/post/:postId" element={<div>Статья</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Content>
      <Footer />
    </AppColumn>
  );
}

export default App;
