

export const initGrid = () => {
  let grid = [];
  for (let y = 0; y < process.env.REACT_APP_GRID_HEIGHT; y++) {
    let columns = [];
    let initialPoint = (y === (parseInt((process.env.REACT_APP_GRID_HEIGHT / 2), 10) - 1) ? true : false);
    for (let x = 0; x < process.env.REACT_APP_GRID_WIDTH; x++) {
      columns.push((x === (parseInt((process.env.REACT_APP_GRID_WIDTH / 2), 10) - 1) && initialPoint) ? true : null);
    }
    grid.push(columns);
  }
  return grid;
};

export const iterateGrid = (next) => {
  for (let x = 0; x < process.env.REACT_APP_GRID_WIDTH; x++) {
    for (let y = 0; y < process.env.REACT_APP_GRID_WIDTH; y++) {
      next(x, y);
    }
  }
};

export const keyCodeToDirection = (keyCode, direction) => {
  switch (keyCode) {
    case 38:
      return 'up';
    case 40:
      return 'down';
    case 37:
      return 'left';
    case 39:
      return 'right';
    default:
      return null;
  }
};

export const validateKeyPress = (currentDirection, keyPressDirection) => {
  if (currentDirection === 'right' && keyPressDirection === 'left') return false;
  if (currentDirection === 'left' && keyPressDirection === 'right') return false;
  if (currentDirection === 'up' && keyPressDirection === 'down') return false;
  if (currentDirection === 'down' && keyPressDirection === 'up') return false;
  return true;
}
