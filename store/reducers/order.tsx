import { OrderActionTypes, ADD_ORDER, SET_ORDERS } from "../actions/order";
import CartItem from "../../models/cartItem";
import Product from "../../models/product";
import Order from "../../models/order";

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export default (state = initialState, action: OrderActionTypes): OrderState => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        new Date(action.orderData.date)
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state;
  }
};
