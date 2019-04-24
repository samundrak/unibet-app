import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  color: white;
  background: #59aa37;
  border-style: none;
  border-radius: 5px;
  padding: 10px;
`;
const Button = ({ children, ...rest }) => {
  return <Btn {...rest}>{children}</Btn>;
};
export default Button;
