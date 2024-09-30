import { combineReducers } from 'redux';
import productsReducer from './productReducers';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
