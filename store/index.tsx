import { createStore, combineReducers } from 'redux';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer);