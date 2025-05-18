import styled from 'styled-components';
import { Input } from '../../../../components';
import { Save } from 'lucide-react';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loadPostAsync,
  RESET_POST_DATA,
  savePostAsync,
} from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

const PostFormContainer = ({
  className,
  id,
  title,
  imageUrl,
  content,
  publishedAt,
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(imageUrl);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const requestServer = useServerRequest();

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => {
      navigate(`/post/${id}`);
    });
  };

  return (
    <div className={className}>
      <Input
        onChange={({ target }) => setImageUrlValue(target.value)}
        defaultValue={imageUrl}
        placeholder="Изображение..."
      />
      <Input
        onChange={({ target }) => setTitleValue(target.value)}
        defaultValue={title}
        placeholder="Заголовок..."
      />
      <div className="content">
        <SpecialPanel
          id={id}
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
      min-height: 80px;
      border: 1px solid #000;
      border-radius: 3px;
    }
  }

  img {
    float: left;
    margin: 0px 20px 5px 0px;
    border: 2px solid #5e5252;
  }
`;
