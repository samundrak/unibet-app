import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  height: 300px;
  display: flex;
  overflow: hidden;
  position: relative;
`;
const Handle = styled.div`
  padding: 1%;
  height: inherit;
  position: absolute;
  ${(props) => props.position}: 0;
  color: white;
  font-size: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div`
  width: 600px;
  height: 300px;
  background-color: black;
`;
const Rings = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: inherit;
  justify-content: center;
  padding: 1%;
`;
const Ring = styled.div`
  margin-left: 1%;
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background: white;
`;

export { Container, Ring, Handle, Item, Rings };
