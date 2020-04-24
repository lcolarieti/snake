import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';
import {
  updateDirectionAction,
  updateMobileAction
} from './../actions/actions';

const mapStateToProps = state => {
  return {
    mobile: state.mobile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDirection: direction => dispatch(updateDirectionAction(direction)),
    updateMobile: mobile => dispatch(updateMobileAction(mobile))
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
    !this.props.mobile && this.props.updateMobile(true);
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

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
