import { OrderActionTypes, ADD_ORDER } from "../actions/order";
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
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state;
  }
};
