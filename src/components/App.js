import React from 'react';
import {connect} from 'react-redux';
import Grid from './Grid';
import Score from './Score';
import Level from './Level';
import Buttons from './DirectionButtons'
import './../app.scss';
import {resetAction} from './../actions/actions';

const mapStateToProps = state => {
  return {
    reset: state.reset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetGrid: reset => dispatch(resetAction(reset))
  };
}

const gridSize = `* {--grid-width: ${process.env.REACT_APP_GRID_WIDTH}; --grid-height: ${process.env.REACT_APP_GRID_HEIGHT};}`;

class App extends React.Component {

  componentDidUpdate(prevProps) {
    (prevProps.reset !== this.props.reset && this.props.reset) && this.props.resetGrid(false);
  }


  render() {
      return (
        <div className="container">
          <header>
            <Score />
            <Level />
          </header>
          {!this.props.reset && <Grid />}
          <Buttons />
          <style>{gridSize}</style>
        </div>
      );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
