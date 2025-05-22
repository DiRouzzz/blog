import { Calendar, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';

const SpecialPanelContainer = ({ className, publishedAt, editButton, id }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate();
  const roleId = useSelector((state) => state.user.roleId);

  const onPostRemove = async () => {
    dispatch(
      openModal({
        text: 'Удалить статью?',
        onConfirm: async () => {
          await dispatch(removePostAsync(requestServer, id));
          await dispatch(CLOSE_MODAL);
          navigate('/');
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <>
            <Calendar />
            {publishedAt}
          </>
        )}
      </div>
      {isAdmin && (
        <div className="icons">
          {editButton}
          {publishedAt && <Trash2 onClick={onPostRemove} />}
        </div>
      )}
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: ${({ margin = 0 }) => margin};

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
