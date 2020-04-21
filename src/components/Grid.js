import React from 'react';
import './../app.scss';
import {
  initGrid,
  keyCodeToDirection,
  validateKeyPress
} from '../utils/utils';
import {connect} from 'react-redux';
import {
  updateGridAction,
  updateGridReadyAction,
  updateDirectionAction,
  eatFoodAction
} from './../actions/actions';
import {gridEvents} from '../utils/grid-events';
import Die from './Die';
import Food from './Food';
import SnakeHead from './SnakeHead';
import SnakeTail from './SnakeTail';

const mapStateToProps = state => {
  return {
    grid: state.grid,
    gridReady: state.gridReady,
    direction: state.direction,
    speed: state.speed,
    died: state.died,
    steps: state.steps,
    snake: state.snake,
    foodCoords: state.foodCoords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGrid: grid => dispatch(updateGridAction(grid)),
    updateGridReady: gridReady => dispatch(updateGridReadyAction(gridReady)),
    updateDirection: direction => dispatch(updateDirectionAction(direction)),
    eatFood: () => dispatch(eatFoodAction())
  };
};

class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.props.updateGrid(initGrid());
    this.interval = null;
    this.state = {
      grid: this.props.grid,
      died: this.props.died,
      direction: this.props.direction,
      nextStep: true,
      foodCoords: this.props.foodCoords
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createGrid() {
    if (!this.state.grid) return;
    let grid = [];
    const {steps, snake} = this.props;
    for (let x = 0; x < process.env.REACT_APP_GRID_WIDTH; x++) {
      let columns = [];
      for (let y = 0; y < process.env.REACT_APP_GRID_HEIGHT; y++) {
        columns.push(
          <div key={y} className={`column column-${y}`}>
            {(this.state.grid[x][y] && this.props.gridReady) && <SnakeHead direction={this.state.direction} />}
            {(gridEvents.tail(steps, snake, {x: x, y: y}) && this.props.gridReady) && <SnakeTail />}
            {(this.props.gridReady && this.state.foodCoords.x === x && this.state.foodCoords.y === y) && <Food eat={this.state.grid[x][y] ? true : false} />}
          </div>
        );
      }
      grid.push(<div key={x} className={`row row-${x}`}>{columns}</div>);
    }
    return grid;
  }

  handleKeyDown(evt) {
    if (!this.state.nextStep || this.state.died) return false;
    let direction = keyCodeToDirection(evt.keyCode, this.state.direction);
    if (!direction) return false;
    if (!validateKeyPress(this.state.direction, direction)) return false;
    this.setState({direction: direction});
    if (this.props.direction !== direction) {
      this.props.updateDirection(direction);
      this.setState({nextStep: false});
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentDidUpdate(prevProps, prevState) {
    prevProps.gridReady !== true && this.props.grid && this.props.updateGridReady(true);

    if (this.props.gridReady) return;
    this.interval = setInterval(() => {
      this.setState({nextStep: false});
      let grid = gridEvents.move(this.props.grid, this.state.direction);
      this.props.updateGrid(grid);
      this.setState({nextStep: true});
      prevProps !== this.props && this.setState({
        grid: this.props.grid,
        died: this.props.died,
        foodCoords: this.props.foodCoords
      });
      this.state.died && clearInterval(this.interval);
    }, this.props.speed);
  }

  render() {
      return (
        <>
          <div id="grid">
            {this.createGrid()}
            {this.state.died && <Die />}
          </div>
        </>
      );
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
