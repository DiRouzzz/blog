import { Route, Routes } from 'react-router-dom';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { Header, Footer, Modal, Error } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

const Content = styled.div`
  padding-top: 160px;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  background-color: white;
  position: relative;
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
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<Post />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Content>
      <Footer />
      <Modal />
    </AppColumn>
  );
}

export default App;
