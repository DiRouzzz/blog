import { Comments, PostContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadPostAsync } from '../../actions';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const params = useParams();
  const requestServer = useServerRequest();

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
  }, [requestServer, dispatch, params.id, post]);
  return (
    <div className={className}>
      <PostContent {...post} />
      <Comments comments={post.comments} postId={post.id} />
    </div>
  );
};

export const Post = styled(PostContainer)``;
