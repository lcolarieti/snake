import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';
import {resetAction} from './../actions/actions';


const mapDispatchToProps = dispatch => {
  return {
    reset: reset => dispatch(resetAction(reset))
  };
};

class Die extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleClick() {
    this.props.reset(true);
  }

  handleKeyPress(evt) {
    evt.keyCode === 32 && this.props.reset(true);
  }

  render() {
      return (
        <>
          <div id="die">
            <div>
              <h2>Game Over</h2>
              <p>To play again click button or press the space key</p>
              <button onClick={this.handleClick}>Play again</button>
            </div>
          </div>
        </>
      );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

}

export default connect(null, mapDispatchToProps)(Die);
