import Product from '../../models/product';
import { ProductActionTypes } from '../actions/products';
import PRODUCTS from '../../data/dummy-data';

export interface ProductsState {
  availableProducts: Product[],
  userProducts: Product[]
}

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
}

export default (state = initialState, action: ProductActionTypes):ProductsState => {
  return state;
}