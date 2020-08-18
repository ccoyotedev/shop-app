export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

import Product from '../../models/product';

export interface deleteProductAction {
  type: typeof DELETE_PRODUCT,
  productId: string
}

export interface createProductAction {
  type: typeof CREATE_PRODUCT,
  productData: {
    title:string,
    description:string,
    imageUrl:string,
    price:number
  }
}

export interface updateProductAction {
  type: typeof UPDATE_PRODUCT,
  productData: {
    id:string,
    title:string,
    description:string,
    imageUrl:string
  }
}

export type ProductActionTypes = deleteProductAction | createProductAction | updateProductAction;

export function deleteProduct(productId: string): ProductActionTypes {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

export function createProduct(title: string, description: string, imageUrl: string, price: number): ProductActionTypes {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  }
}

export function updateProduct(id: string, title: string, description: string, imageUrl: string): ProductActionTypes {
  return {
    type: UPDATE_PRODUCT,
    productData: {
      id,
      title,
      description,
      imageUrl
    }
  }
}