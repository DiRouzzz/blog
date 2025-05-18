import { Calendar, Trash2 } from 'lucide-react';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
  return (
    <div className={className}>
      <div className="published-at">
        <Calendar />
        {publishedAt}
      </div>
      <div className="icons">
        {editButton}
        <Trash2 />
      </div>
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
