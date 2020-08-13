import CartItem from "../../models/cartItem";

export const ADD_ORDER = 'ADD_ORDER';

export interface addOrderAction {
  type: typeof ADD_ORDER,
  orderData: {
    items: CartItem[],
    amount: number
  }
}

export type OrderActionTypes = addOrderAction;

export function addOrder(cartItems: CartItem[], totalAmount: number): OrderActionTypes {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount}
  }
}
