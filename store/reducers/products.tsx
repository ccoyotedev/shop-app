import Product from "../../models/product";
import { ProductActionTypes, DELETE_PRODUCT } from "../actions/products";
import PRODUCTS from "../../data/dummy-data";

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (
  state = initialState,
  action: ProductActionTypes
): ProductsState => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.productId
        ),
      };
    default:
      return state
  }
};
