import Product from '../../models/product'
import {addOrderAction} from './order'

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

interface addToCartAction {
  type: typeof ADD_TO_CART,
  product: Product
}

interface removeFromCartAction {
  type: typeof REMOVE_FROM_CART,
  productId: string
}

export type CartActionTypes = addToCartAction | removeFromCartAction | addOrderAction;

export function addToCart(product: Product): CartActionTypes {
  return {
    type: ADD_TO_CART,
    product
  }
}

export function removeFromCart(productId: string): CartActionTypes {
  return {
    type: REMOVE_FROM_CART,
    productId: productId
  }
}