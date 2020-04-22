import React from 'react';
import './../app.scss';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    level: state.level
  };
};

class Level extends React.Component {

  render() {
    return (
      <div className="level-wrap">
        <p>
          <strong>Level: </strong>
          {this.props.level}
        </p>
      </div>
    );
  }

}

export default connect(mapStateToProps, null)(Level);
