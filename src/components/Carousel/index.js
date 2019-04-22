import React from 'react';
import { Container, Handle, Item, Rings } from './style';

class Carousel extends React.Component {
  render() {
    return (
      <Container>
        <Handle position="left">
          <div>&lt;</div>
        </Handle>
        <Handle position="right">&gt;</Handle>
        <Item />
        <Rings>This is Rings</Rings>
      </Container>
    );
  }
}
export default Carousel;
