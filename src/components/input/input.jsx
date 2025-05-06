import styled from 'styled-components';
import React, { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} ref={ref} {...props} />;
});

export const Input = styled(InputContainer)`
  height: 40px;
  padding: 10px;
  margin: 0 0 10px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 18px;
  width: ${({ width = '100%' }) => width};
`;
