import {iterateGrid} from './utils';
import {updateDiedAction, updateStepsAction} from './../actions/actions';
import store from '../store/index';


export const gridEvents = {

  move: (grid, direction, steps, snake) => {
    let moved = false;
    iterateGrid((x, y) => {
      if (grid[x][y] && !moved) {
        grid[x][y] = null;
        moved = true;
        switch (direction) {
          case 'right':
          case 'left':
            let newY = (direction === 'right' ? y + 1 : y - 1);
            if ((newY >= process.env.REACT_APP_GRID_WIDTH || newY < 0) || gridEvents.tail(steps, snake, {x: x, y: newY})) {
              grid[x][y] = true;
              gridEvents.die(true);
            } else {
              grid[x][newY] = true;
            }
            break;

          case 'down':
          case 'up':
            let newX = (direction === 'down' ? x + 1 : x - 1);
            if ((newX >= process.env.REACT_APP_GRID_HEIGHT || newX < 0) || gridEvents.tail(steps, snake, {x: newX, y: y})) {
              grid[x][y] = true;
              gridEvents.die(true);
            } else {
              grid[newX][y] = true;
            }
            break;
          default:
        }
        store.dispatch(updateStepsAction({x: x, y: y}));
      }
    });
    return grid;
  },

  die: (died) => {
    store.dispatch(updateDiedAction(died));
  },

  tail: (steps, snake, coords) => {
    if (steps === undefined) return false;
    if (steps.length < snake || snake === 1) return false;
    const {x, y} = coords;
    let tailCoords = steps.slice((snake - 1) * -1);
    if (tailCoords.find(cell => {return cell.x === x && cell.y === y})) return true;
    return false;
  },

  insertFood: (steps, snake, foodCoords) => {
    if (steps === undefined || snake === undefined) return gridEvents.generateCoords(steps, snake, foodCoords);
    return gridEvents.generateCoords(steps, snake, foodCoords);
  },

  generateCoords: (steps, snake, foodCoords) => {
    if (foodCoords === undefined) foodCoords = {
      x: (parseInt((process.env.REACT_APP_GRID_HEIGHT / 2), 10) - 1),
      y: (parseInt((process.env.REACT_APP_GRID_WIDTH / 2), 10) - 1)
    };
    let coords = null;
    do {
      coords = {
        x: gridEvents.randomNumber(0, process.env.REACT_APP_GRID_WIDTH),
        y: gridEvents.randomNumber(0, process.env.REACT_APP_GRID_HEIGHT)
      };
    } while (coords.x === foodCoords.x || gridEvents.tail(steps, snake, coords));
    return coords;
  },

  randomNumber: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

};
