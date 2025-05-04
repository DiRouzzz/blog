import styled from 'styled-components';

const IconContainer = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const Icon = styled(IconContainer)`
  display: flex;
  align-items: center;
  margin: ${({ margin = '0' }) => margin};
`;
