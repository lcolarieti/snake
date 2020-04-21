import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';
import {gridEvents} from '../utils/grid-events';
import {
  eatFoodAction,
  updateTailAction
} from './../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    eatFood: () => dispatch(eatFoodAction()),
    updateTail: () => dispatch(updateTailAction())
  };
};

class Food extends React.Component {

  constructor(props) {
    super(props);

    const foodImages = ['rat.png', 'apple.png', 'egg.png'];
    this.food = <img className="food" src={`${process.env.PUBLIC_URL}/images/${foodImages[gridEvents.randomNumber(0, 3)]}`} alt="Food" />
    this.state = {
      eat: this.props.eat
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.eat !== this.props.eat && this.props.eat) {
      this.props.eatFood();
      this.props.updateTail();
    }
  }

  render() {
    return this.food;
  }

}

export default connect(null, mapDispatchToProps)(Food);
