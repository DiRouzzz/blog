import styled from 'styled-components';
import { H2 } from '../../../../components';
import { SquarePen } from 'lucide-react';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const PostContentContainer = ({
  className,
  id,
  title,
  imageUrl,
  content,
  publishedAt,
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <H2>{title}</H2>
      <div className="content">
        <SpecialPanel
          id={id}
          publishedAt={publishedAt}
          editButton={
            <SquarePen onClick={() => navigate(`/post/${id}/edit`)} />
          }
        />
        <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
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
