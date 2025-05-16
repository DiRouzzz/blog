import { CircleUserRound, Trash2, Calendar } from 'lucide-react';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
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
      <Trash2 />
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  svg {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
      transition: all 0.2s ease;
    }
  }

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
`;
