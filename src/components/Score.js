import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    score: state.score
  };
};

class Score extends React.Component {

  render() {
    return (
      <div className="score-wrap">
        <p>
          <strong>Your Score: </strong>
          {this.props.score}
        </p>
      </div>
    );
  }

}

export default connect(mapStateToProps, null)(Score);
