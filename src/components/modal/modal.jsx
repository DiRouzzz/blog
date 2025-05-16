import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
  const { text, isOpen, onConfirm, onCancel } = useSelector(
    (state) => state.app.modal
  );

  if (!isOpen) return null;

  return (
    <div className={className}>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button width="120px" onClick={onConfirm}>
            Да
          </Button>
          <Button width="120px" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 200px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    padding-top: 30px;
    margin: 500px auto;
  }

  .buttons {
    display: flex;
    gap: 20px;
  }
`;
