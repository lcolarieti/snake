import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';
import {updateDirectionAction} from './../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    updateDirection: direction => dispatch(updateDirectionAction(direction))
  };
};

class Buttons extends React.Component {

  constructor(props) {
    super(props);

    this.style = {
      backgroundImage: `url('${process.env.PUBLIC_URL}/images/arrows.png')`
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(evt) {
    this.props.updateDirection(evt.target.getAttribute('id'));
  }

  render() {
    return (
      <div className="buttons-wrap">
        <button id="up" onClick={this.handleButtonClick} style={this.style}></button>
        <button id="right" onClick={this.handleButtonClick} style={this.style}></button>
        <button id="down" onClick={this.handleButtonClick} style={this.style}></button>
        <button id="left" onClick={this.handleButtonClick} style={this.style}></button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Buttons);
