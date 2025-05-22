import { CircleUserRound, Trash2, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { ROLE } from '../../../../../../constants';

const CommentContainer = ({
  className,
  id,
  author,
  content,
  publishedAt,
  postId,
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector((state) => state.user.roleId);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: 'Удалить комментарий?',
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, id, postId));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className={className}>
      <div className="content">
        <div className="panel-info">
          <div className="user">
            <CircleUserRound />
            <p>{author}</p>
          </div>
          <div className="data">
            <Calendar />
            <p>{publishedAt}</p>
          </div>
        </div>
        <div className="text-content">{content}</div>
      </div>
      <div className="trash">
        {isAdminOrModerator && <Trash2 onClick={() => onCommentRemove(id)} />}
      </div>
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  .content {
    max-width: 650px;
    height: 100px;
    border: 2px solid #665959;
    border-radius: 3px;

    .text-content {
      padding: 0px 5px;
      width: 650px;
      height: 50px;
      overflow: hidden;
    }

    .panel-info {
      display: flex;
      justify-content: space-between;
      padding: 5px;

      .user,
      .data {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: -15px;
      }
    }
  }

  .trash {
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
  }
`;
