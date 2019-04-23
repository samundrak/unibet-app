import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Container, Handle, Item } from './style';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this._wrappedChildren = [];
    this.currentSlideIndex = 0;
    this._slideDirection = 'right';
  }
  componentDidMount() {
    const childrens = this.props.children;
    console.log(childrens);
    this.setState({});
    this.wrapChildren(this.props.children);
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
    this._wrappedChildren = this.props.children.map(item => ({
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
    }
  };

  render() {
    return (
      <Container
        width={this.props.width}
        height={this.props.height}
        ref={el => (this._containerEl = el)}
      >
        {this._wrappedChildren.map((children, index) => {
          return (
            <Item
              ref={el => (this._wrappedChildren[index].el = el)}
              key={children.id}
            >
              {children.item}
            </Item>
          );
        })}
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
