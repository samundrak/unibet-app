import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.width || 600};
  height: ${props => props.height || 400};
  display: flex;
  overflow: hidden;
  position: relative;
`;
const Handle = styled.div`
  padding: 1%;
  height: inherit;
  position: absolute;
  ${props => props.position}: 0;
  color: white;
  font-size: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.5s;
  z-index: 9;
  &:hover {
    opacity: 1;
  }
`;
const Item = styled.div`
  width: inherit;
  height: inherit;
  background-color: black;
  color: white;
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
  height: ${props => (props.isCurrent ? '3px' : '1px')};
  width: ${props => (props.isCurrent ? '3px' : '1px')};
  border-radius: 100px;
  background: white;
  transition: all 500ms;
`;

const SliderContainer = styled.div``;
export { Container, SliderContainer, Ring, Handle, Item, Rings };
