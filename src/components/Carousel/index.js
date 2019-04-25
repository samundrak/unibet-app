import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Container, Rings, Ring, Item } from './style';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      tempArr: [],
      slideCounter: 0,
    };
  }
  componentDidMount() {
    this.setState({
      slides: Array(2).fill(false),
    });
    this._containerBound = this._containerEl.getBoundingClientRect();
    this.autoSlide();
  }
  autoSlide() {
    setInterval(() => {
      this.next();
    }, this.props.autoSlideTimeInMS);
  }

  next = () => {
    const slides = this.state.slides;
    slides.fill(true);
    this.setState(
      {
        slides,
      },
      () => {
        let slideCounter = this.state.slideCounter;
        slideCounter += 1;
        if (slideCounter > this.props.totalCount - 1) {
          slideCounter = 0;
        }
        this.setState({
          slideCounter,
        });
      },
    );
  };

  handleAnimationEnd = index => {
    return () => {
      if (index) {
        const slides = this.state.slides;
        slides.shift();
        slides.push(false);
        slides.fill(false);
        this.setState({
          slides,
        });
      }
    };
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.tempArr.length !== nextProps.totalCount) {
      this.setState({
        tempArr: Array(nextProps.totalCount).fill(true),
      });
    }
  }
  render() {
    return (
      <Container
        width={this.props.width}
        height={this.props.height}
        ref={el => (this._containerEl = el)}
      >
        {this.props.loading && <div className="lds-hourglass" />}
        {this.state.slides.map((slide, index) => {
          return (
            <Item
              className={slide ? 'slideOutLeft' : ''}
              key={index}
              onAnimationEnd={this.handleAnimationEnd(index)}
            >
              {this.props.render(this.state.slideCounter)}
            </Item>
          );
        })}
        <Rings>
          {this.state.tempArr.map((item, index) => (
            <Ring key={index} isCurrent={this.state.slideCounter === index} />
          ))}
        </Rings>
      </Container>
    );
  }
}

Carousel.propTypes = {
  autoSlideTimeInMS: PropTypes.number,
};
Carousel.defaultProps = {
  children: () => <div />,
  autoSlideTimeInMS: 3000,
  totalCount: 1,
};
export default Carousel;
