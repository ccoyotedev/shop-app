import Product from "../../models/product";
import { AppThunk, DispatchThunk } from "../index";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export interface deleteProductAction {
  type: typeof DELETE_PRODUCT;
  productId: string;
}

export interface setProductsAction {
  type: typeof SET_PRODUCTS;
  products: Product[];
}

export interface createProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

export interface updateProductAction {
  type: typeof UPDATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

export type ProductActionTypes =
  | deleteProductAction
  | createProductAction
  | updateProductAction
  | setProductsAction;

export function deleteProduct(productId: string): AppThunk {
  return async dispatch => {
    await fetch(
      `https://rn-complete-guide-12906.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_PRODUCT, productId: productId})
  }
}

export const fetchProducts = (): AppThunk<Promise<{ result: string }>> => {
  return async (dispatch: DispatchThunk) => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-12906.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
  
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
      return { result: "Product load successful"};
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export function createProduct(
  title: string,
  description: string,
  imageUrl: string,
  price: number
): AppThunk {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-complete-guide-12906.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
}

export function updateProduct(
  id: string,
  title: string,
  description: string,
  imageUrl: string
): AppThunk {
  return async dispatch => {
    await fetch(
      `https://rn-complete-guide-12906.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        id,
        title,
        description,
        imageUrl,
      }
    })
  }
}
