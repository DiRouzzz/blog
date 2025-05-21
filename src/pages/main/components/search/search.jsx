import styled from 'styled-components';
import { Input } from '../../../../components';
import { Search } from 'lucide-react';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        placeholder="Поиск по заголовкам..."
        value={searchPhrase}
        onChange={onChange}
      />
      <Search />
    </div>
  );
};

export const SearchInput = styled(SearchContainer)`
  display: flex;
  height: 40px;
  width: 340px;
  margin: 0 auto;
  align-items: center;
  position: relative;

  input {
    padding: 10px 32px 10px 10px;
  }

  svg {
    position: absolute;
    right: 8px;
    top: 3px;
  }
`;
