import { useEffect, useState, useMemo } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination, SearchInput } from './components';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks, debounce } from './utils';

const MainContainer = ({ className }) => {
  const requestServer = useServerRequest();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
      ({ response }) => {
        setPosts(response.posts);
        setLastPage(getLastPageFromLinks(response.links));
      }
    );
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <SearchInput onChange={onSearch} searchPhrase={searchPhrase} />

      {posts.length ? (
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
      ) : (
        <div className="no-posts-found">Статьи не найдены</div>
      )}
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
    margin-top: 20px;
    height: 100%;
  }

  .pagination-wrapper {
    position: absolute;
    width: 100%;
    bottom: 140px;
  }

  .no-posts-found {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
  }
`;
