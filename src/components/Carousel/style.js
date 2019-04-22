import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  height: 400px;
`;
const Handle = styled.div`
  float: ${props => props.position};
  color: white;
  display: flex;
`;
const Item = styled.div`
  width: 600px;
  height: 400px;
  background-color: black;
`;
const Rings = styled.div`
  position: relative;
  bottom: 0px;
`;

export { Container, Handle, Item, Rings };
