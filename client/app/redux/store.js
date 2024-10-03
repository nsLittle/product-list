import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import productsReducer from './reducers/productReducers';

const store = configureStore({
  reducer: {
    products: productsReducer,
  }
})

export default store;