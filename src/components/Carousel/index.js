import React from 'react';
import PropTypes from 'prop-types';
import { Container, Error, Rings, Ring, Item } from './style';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      tempArr: [],
      slideCounter: 0,
    };
    this._runningInterval = null;
  }
  componentDidMount() {
    this.setState({
      slides: Array(2).fill(false),
    });
    this._containerBound = this._containerEl.getBoundingClientRect();
  }
  autoSlide() {
    this._runningInterval = setInterval(() => {
      this.next();
    }, this.props.autoSlideTimeInMS);
  }

  // We will create a never ending slide by
  // translate only 2 elements
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
      }
    );
  };

  handleAnimationEnd = (index) => {
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
    // Start auto slide only after initial loading has been finished
    if (this.props.loading !== nextProps.loading && !nextProps.loading) {
      if (this._runningInterval) {
        clearInterval(this._runningInterval);
      }
      this.autoSlide();
    }
    // tempArr to store updated length of events
    if (this.state.tempArr.length !== nextProps.totalCount) {
      this.setState({
        tempArr: Array(nextProps.totalCount).fill(true),
      });
    }

    if (nextProps.wasErrorFetchingLiveScore) {
      clearInterval(this._runningInterval);
    }

    // On schedule runner if error is not there
    // then start sliding
    if (
      this.props.wasErrorFetchingLiveScore !==
        nextProps.wasErrorFetchingLiveScore &&
      !nextProps.wasErrorFetchingLiveScore
    ) {
      this.autoSlide();
    }
  }
  componentWillUnmount() {
    clearInterval(this._runningInterval);
  }
  render() {
    return (
      <Container
        width={this.props.width}
        height={this.props.height}
        ref={(el) => (this._containerEl = el)}
      >
        {this.props.loading && <div className="lds-hourglass" />}
        {this.props.wasErrorFetchingLiveScore && (
          <Error>
            {this.props.onError ? this.props.onError() : 'No items'}
          </Error>
        )}
        {!this.props.wasErrorFetchingLiveScore &&
          this.state.slides.map((slide, index) => {
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
        {!this.props.wasErrorFetchingLiveScore && (
          <Rings>
            {this.state.tempArr.map((item, index) => (
              <Ring key={index} isCurrent={this.state.slideCounter === index} />
            ))}
          </Rings>
        )}
      </Container>
    );
  }
}

Carousel.propTypes = {
  autoSlideTimeInMS: PropTypes.number,
  loading: PropTypes.bool,
  render: PropTypes.func.isRequired,
  onError: PropTypes.func,
};
Carousel.defaultProps = {
  children: () => <div />,
  autoSlideTimeInMS: 3000,
  totalCount: 1,
};
export default Carousel;
