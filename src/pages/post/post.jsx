import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync } from '../../actions';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const params = useParams();
  const requestServer = useServerRequest();
  const isEditing = useMatch('/post/:id/edit');

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
  }, [requestServer, dispatch, params.id]);
  return (
    <div className={className}>
      {isEditing ? (
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
