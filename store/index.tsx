import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';
import ReduxThunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

export type DispatchThunk = ThunkDispatch<
  RootState,
  undefined,
  Action<string>
>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(ReduxThunk));