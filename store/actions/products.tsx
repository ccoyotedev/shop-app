export const DELETE_PRODUCT = 'DELETE_PRODUCT';
import Product from '../../models/product';

export interface deleteProductAction {
  type: typeof DELETE_PRODUCT,
  productId: string
}

export type ProductActionTypes = deleteProductAction;

export function deleteProduct(productId: string): ProductActionTypes {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}