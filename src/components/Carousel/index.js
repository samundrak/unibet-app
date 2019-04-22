import React from 'react';
import PropTypes from 'prop-types';
import { Container, Handle, Item, Rings, Ring } from './style';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slidesLength: 0,
      currentSlideIndex: -1,
    };
  }
  componentDidMount() {
    const childrens = this.props.children;
    console.log(childrens);
    this.setState({
      slidesLength: childrens.length,
    });
  }
  render() {
    return (
      <Container>
        <Handle position="left">
          <div>&lt;</div>
        </Handle>
        <Handle position="right">&gt;</Handle>
        <Item>{this.props.children}</Item>
        <Rings>
          {this.props.children.map((item, index) => (
            <Ring key={index} />
          ))}
        </Rings>
      </Container>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
Carousel.defaultProps = {
  children: () => <div />,
};
export default Carousel;
