import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination } from './components';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils';

const MainContainer = ({ className }) => {
  const requestServer = useServerRequest();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    requestServer('fetchPosts', page, PAGINATION_LIMIT).then(({ response }) => {
      setPosts(response.posts);
      setLastPage(getLastPageFromLinks(response.links));
    });
  }, [requestServer, page]);

  return (
    <div className={className}>
      <div className="post-list">
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
      <div className="pagination-wrapper">
        {lastPage > 1 && (
          <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  .post-list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: space-evenly;
    grid-gap: 15px;
    margin-top: 30px;
  }

  .pagination-wrapper {
    padding: 30px;
  }
`;
