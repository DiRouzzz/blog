import { Send } from 'lucide-react';
import { Comment } from './components';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync, loadPostAsync } from '../../../../actions';
import { ROLE } from '../../../../constants';

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const { id, roleId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = async (id, postId, content) => {
    await dispatch(addCommentAsync(requestServer, id, postId, content));
    // dispatch(loadPostAsync(requestServer, postId));
    setNewComment('');
  };

  const isGuest = roleId === ROLE.GUEST;

  return (
    <div className={className}>
      {!isGuest && (
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
            onClick={() => onNewCommentAdd(id, postId, newComment)}
          />
        </div>
      )}
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

    svg {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
        transform: scale(1.05);
        transition: all 0.2s ease;
      }

      &:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #3e8e41;
      }
    }

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

  .comments {
    margin-bottom: 30px;
  }
`;
