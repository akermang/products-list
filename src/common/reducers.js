import { combineReducers } from 'redux';
import sharedReducer from './state/shared/shared.reducer';
import dialogReducer from './state/dialog/dialog.reducer';
import drawerReducer from './state/drawer/drawer.reducer';
import productsReducer from './state/products/products.reducer';

const rootReducer = combineReducers({
  shared: sharedReducer,
  dialog: dialogReducer,
  drawer: drawerReducer,
  products: productsReducer
});

export default rootReducer;
