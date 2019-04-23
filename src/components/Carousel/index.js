import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Container, Rings, Ring, Item } from './style';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this._wrappedChildren = [];
    this.currentSlideIndex = 0;
    this._slideDirection = 'right';
  }
  componentDidMount() {
    this.wrapChildren(
      Array(3)
        .fill(true)
        .map(() => this.props.render())
    );
    this._containerBound = this._containerEl.getBoundingClientRect();
    this.autoSlide();
  }
  autoSlide() {
    setInterval(() => {
      if (this._slideDirection === 'right') {
        this.next();
        if (this.currentSlideIndex === this._wrappedChildren.length - 1) {
          this._slideDirection = 'left';
        }
      }
      if (this._slideDirection === 'left') {
        this.previous();
        if (this.currentSlideIndex < 0) {
          this._slideDirection = 'right';
        }
      }
    }, this.props.autoSlideTimeInMS);
  }
  wrapChildren(children) {
    this._wrappedChildren = children.map((item) => ({
      id: uuid(),
      item,
    }));
  }
  previous = () => {
    const currentSlideIndex = this.currentSlideIndex;
    const currentItem = this._wrappedChildren[currentSlideIndex];
    if (currentItem && currentItem.el) {
      currentItem.el.style.marginLeft = '0px';
      this.currentSlideIndex -= 1;
      this.setState({
        currentIndex: this.currentSlideIndex,
      });
    }
  };
  next = () => {
    const currentSlideIndex = this.currentSlideIndex;
    if (currentSlideIndex >= this._wrappedChildren.length - 1) {
      return;
    }
    const currentItem = this._wrappedChildren[currentSlideIndex];
    if (currentItem && currentItem.el) {
      currentItem.el.style.marginLeft = `-${this._containerBound.width}px`;
    }
    if (currentSlideIndex < this._wrappedChildren.length) {
      this.currentSlideIndex += 1;
      this.setState({
        currentIndex: this.currentSlideIndex,
      });
    }
  };
  componentWillReceiveProps() {}
  render() {
    return (
      <Container
        width={this.props.width}
        height={this.props.height}
        ref={(el) => (this._containerEl = el)}
      >
        {this._wrappedChildren.map((children, index) => {
          return (
            <Item
              ref={(el) => (this._wrappedChildren[index].el = el)}
              key={children.id}
            >
              {children.item}
            </Item>
          );
        })}
        <Rings>
          {this.props.children.map((item, index) => (
            <Ring key={index} isCurrent={this.currentSlideIndex === index} />
          ))}
        </Rings>
      </Container>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  autoSlideTimeInMS: PropTypes.number,
};
Carousel.defaultProps = {
  children: () => <div />,
  autoSlideTimeInMS: 3000,
};
export default Carousel;
