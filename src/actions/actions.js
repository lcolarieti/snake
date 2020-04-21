import {
  GRID_READY,
  UPDATE_GRID,
  UPDATE_DIED,
  UPDATE_DIRECTION,
  RESET,
  UPDATE_STEPS,
  EAT_FOOD,
  UPDATE_TAIL
} from '../constants/constants';

export const updateGridAction = (grid) => {
  return (dispatch) => {
      dispatch({type: UPDATE_GRID, grid: grid});
  }
}

export const updateGridReadyAction = (gridReady) => {
  return {type: GRID_READY, gridReady: gridReady};
}

export const updateDiedAction = (died) => {
  return {type: UPDATE_DIED, died: died};
}

export const updateDirectionAction = (direction) => {
  return {type: UPDATE_DIRECTION, direction: direction};
}

export const resetAction = (reset) => {
  return {type: RESET, reset: reset};
}

export const updateStepsAction = (step) => {
  return {type: UPDATE_STEPS, steps: step};
}

export const eatFoodAction = () => {
  return {type: EAT_FOOD};
}

export const updateTailAction = () => {
  return {type: UPDATE_TAIL};
}
