import { Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContainer = ({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={`/post/${id}`}>
        <img src={imageUrl} />
        <div className="post-card-footer">
          <h3>{title}</h3>
          <div className="post-card-info">
            <div className="published-at">
              <Calendar />
              {publishedAt}
            </div>
            <div className="comments-count">
              <MessageCircle />
              {commentsCount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
  border: 2px solid black;
  border-radius: 3px;

  .post-card-footer {
    border-top: 2px solid black;
    margin-top: -4px;
    padding: 10px;

    .post-card-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .comments-count,
      .published-at {
        display: flex;
        gap: 5px;
        align-items: center;
        font-weight: bold;
      }
    }
  }
`;
