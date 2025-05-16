import styled from 'styled-components';
import { H2 } from '../../../../components';
import { Calendar, SquarePen, Trash2 } from 'lucide-react';

const PostContentContainer = ({
  className,
  id,
  title,
  imageUrl,
  content,
  publishedAt,
}) => {
  return (
    <div className={className}>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <H2>{title}</H2>
      <div className="content">
        <div className="special-panel">
          <div className="published-at">
            <Calendar />
            {publishedAt}
          </div>
          <div className="icons">
            <SquarePen />
            <Trash2 />
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  max-width: 1100px;
  margin: auto;

  H2 {
    margin-bottom: 10px;
  }

  .content {
    .special-panel {
      display: flex;
      justify-content: space-between;

      .published-at {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 18px;
      }

      .icons {
        display: flex;
        gap: 15px;
        cursor: pointer;
      }
    }

    p {
      text-align: left;
      letter-spacing: 1px;
    }
  }

  img {
    float: left;
    margin: 0px 20px 5px 0px;
    border: 2px solid #5e5252;
  }
`;
