import { Send } from 'lucide-react';
import { Comment } from './components';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions';

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment('');
  };

  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
          name="comment"
          value={newComment}
          placeholder="Комментарий..."
          maxLength={100}
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <Send
          style={{ cursor: 'pointer' }}
          onClick={() => onNewCommentAdd(userId, postId, newComment)}
        />
      </div>
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            postId={postId}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  .new-comment {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;

    textarea {
      width: 650px;
      height: 150px;
      resize: none;
      border: 2px solid #665959;
      border-radius: 3px;
      padding: 10px;
      font-weight: 600;
      font-size: 16px;
    }
  }
`;
