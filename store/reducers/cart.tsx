import {
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/cart";
import CartItem, { CartItems } from "../../models/cartItem";
import Product from "../../models/product";
import { ADD_ORDER } from "../actions/order";

export interface CartState {
  cartItems: CartItems;
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: {},
  totalAmount: 0,
};

export default (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [addedProduct.id]: state.cartItems[addedProduct.id]
            ? new CartItem(
                state.cartItems[addedProduct.id].quantity + 1,
                prodPrice,
                prodTitle,
                state.cartItems[addedProduct.id].sum + prodPrice
              )
            : new CartItem(1, prodPrice, prodTitle, prodPrice),
        },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.cartItems[action.productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {...state.cartItems, [action.productId]: updatedCartItem}
      } else {
        updatedCartItems = { ...state.cartItems };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
    case ADD_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};
