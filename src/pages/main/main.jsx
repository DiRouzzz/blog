import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
  const requestServer = useServerRequest();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    requestServer('fetchPosts').then((posts) => {
      setPosts(posts.response);
    });
  }, []);

  return (
    <div className={className}>
      {posts.map(({ id, title, publishedAt, commentsCount, imageUrl }) => (
        <PostCard
          key={id}
          id={id}
          imageUrl={imageUrl}
          title={title}
          publishedAt={publishedAt}
          commentsCount={commentsCount}
        />
      ))}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-evenly;
  grid-gap: 15px;
  margin-top: 30px;
`;
