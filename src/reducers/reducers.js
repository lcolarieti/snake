import {
  UPDATE_GRID,
  GRID_READY,
  UPDATE_DIED,
  UPDATE_DIRECTION,
  RESET,
  UPDATE_STEPS,
  EAT_FOOD,
  UPDATE_TAIL,
  UPDATE_SCORE
} from '../constants/constants';
import {gridEvents} from '../utils/grid-events';


const initialState = {
  grid: null,
  direction: 'right',
  gridReady : false,
  speed: 200,
  died: false,
  reset: false,
  steps: [],
  snake: 1,
  score: 0,
  level: 1,
  foodCoords: gridEvents.insertFood()
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case UPDATE_GRID:
      return Object.assign({}, state, {grid: action.grid});
    case GRID_READY:
      return Object.assign({}, state, {gridReady: action.gridReady});
    case UPDATE_DIED:
      return Object.assign({}, state, {died: action.died});
    case UPDATE_DIRECTION:
      return Object.assign({}, state, {direction: action.direction});
    case RESET:
      return Object.assign({}, initialState, {reset: action.reset});
    case UPDATE_STEPS:
      return Object.assign({}, state, {steps: (!state.died ? [...state.steps, action.steps] : [...state.steps])});
    case EAT_FOOD:
      let eat = gridEvents.insertFood(state.steps, state.snake, state.foodCoords);
      return Object.assign({}, state, {foodCoords: eat});
    case UPDATE_TAIL:
      return Object.assign({}, state, {snake: (state.snake + 1)});
    case UPDATE_SCORE:
      let stateUpdated = {score: state.score + 10};
      if (((state.snake - 1) / 10) % 1 === 0 && state.speed >= 40) {
        stateUpdated = Object.assign({}, stateUpdated, {
          speed: state.speed - 20,
          level: state.level + 1
        });
      }
      return Object.assign({}, state, stateUpdated);
    default:
      return state;
  }

}


export default rootReducer;
