import CartItem from "../../models/cartItem";
import { AppThunk, DispatchThunk } from "../index";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export interface addOrderAction {
  type: typeof ADD_ORDER,
  orderData: Order
}

export interface setOrdersAction {
  type: typeof SET_ORDERS,
  orders: Order[]
}


export type OrderActionTypes = addOrderAction | setOrdersAction;

export function fetchOrders(): AppThunk<Promise<{ result: string }>> {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-12906.firebaseio.com/orders/u1.json"
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
    dispatch({type: SET_ORDERS, orders: loadedOrders});
    return { result: "Order fetch successful"};
  } catch (err) {
    throw err;
  }
}}

export function addOrder(cartItems: CartItem[], totalAmount: number): AppThunk<Promise<{ result: string }>> {
  return async (dispatch: DispatchThunk) => {
    const date = new Date().toISOString();
    const response = await fetch(
      "https://rn-complete-guide-12906.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!")
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, totalAmount: totalAmount, date }
    })
    return { result: "Order successful"};
  }
}
