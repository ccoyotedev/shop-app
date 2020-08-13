import { createStore, combineReducers } from 'redux';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer);