import styled from 'styled-components';
import { Input } from '../../../../components';
import { Save } from 'lucide-react';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPostAsync, savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

const PostFormContainer = ({
  className,
  id,
  title,
  imageUrl,
  content,
  publishedAt,
}) => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const requestServer = useServerRequest();

  const onSave = async () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    await dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      })
    );

    await dispatch(loadPostAsync(requestServer, id));

    navigate(`/post/${id}`);
  };

  return (
    <div className={className}>
      <Input
        ref={imageRef}
        defaultValue={imageUrl}
        placeholder="Изображение..."
      />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />
      <div className="content">
        <SpecialPanel
          publishedAt={publishedAt}
          margin="20px 0"
          editButton={<Save onClick={onSave} />}
        />
        <p
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          style={{ whiteSpace: 'pre-line' }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  max-width: 1100px;
  margin: 40px auto;

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
