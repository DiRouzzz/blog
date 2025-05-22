import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';
import { Error } from '../../components';

const PostContainer = ({ className }) => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const params = useParams();
  const requestServer = useServerRequest();
  const isEditing = useMatch('/post/:id/edit');
  const isCreating = useMatch('/post');
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [requestServer, dispatch, params.id, isCreating]);

  if (isLoading) {
    return null;
  }

  return error ? (
    <Error error={error} />
  ) : (
    <div className={className}>
      {isCreating || isEditing ? (
        <PostForm {...post} />
      ) : (
        <>
          <PostContent {...post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)``;
