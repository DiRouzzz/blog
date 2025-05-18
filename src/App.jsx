import { Route, Routes } from 'react-router-dom';
import { Authorization, Post, Registration, Users } from './pages';
import { Header, Footer, Modal } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import styled from 'styled-components';

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
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentuserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({ ...currentuserData }));
  }, [dispatch]);
  return (
    <AppColumn>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<div>Посты</div>} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<Post />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Content>
      <Footer />
      <Modal />
    </AppColumn>
  );
}

export default App;
