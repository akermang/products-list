import sharedState from './shared.state';
import {
  LOADING_START,
  LOADING_DONE
} from './shared.actions';

function sharedReducer (state = sharedState, action) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, loading: true };

    case LOADING_DONE:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default sharedReducer;
