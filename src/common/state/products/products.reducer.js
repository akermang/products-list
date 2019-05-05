import productsState from './products.state';
import {
  FETCH_PRODUCTS_LIST,
  FETCH_CTEGORIES_LIST,
  FETCH_ADD_PRODUCT,
  FETCH_UPDATE_PRODUCT,
  FETCH_DELETE_PRODUCT
} from './products.actions';
import { SUCCESS_SUFFIX } from '../../constants';

function productsReducer (state = productsState, action) {
  switch (action.type) {
    case `${FETCH_PRODUCTS_LIST}${SUCCESS_SUFFIX}`:
      return { ...state, productsList: action.payload };

    case `${FETCH_CTEGORIES_LIST}${SUCCESS_SUFFIX}`:
      return { ...state, categoriesList: action.payload };

    case `${FETCH_ADD_PRODUCT}${SUCCESS_SUFFIX}`:
      return { ...state, productsList: action.payload };

    case `${FETCH_UPDATE_PRODUCT}${SUCCESS_SUFFIX}`:
      return { ...state, productsList: action.payload };

    case `${FETCH_DELETE_PRODUCT}${SUCCESS_SUFFIX}`:
      return { ...state, productsList: action.payload };

    default:
      return state;
  }
}

export default productsReducer;
