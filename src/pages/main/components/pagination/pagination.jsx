import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        Предыдущая
      </Button>
      <div className="current-page">Страница: {page}</div>
      <Button
        disabled={page === lastPage}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 45px 25px 15px 25px;

  .current-page {
    border: 1px solid black;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    padding: 3px;
    width: 100%;
    font-weight: 500;
  }
`;
