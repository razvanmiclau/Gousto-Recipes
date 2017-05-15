import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  SEARCH_PRODUCT
} from '../constants/products'

export const getProducts = () => {
  return {
    type: GET_PRODUCTS
  }
}

export const getProductsSuccess = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products
  }
}

export const getProductsFail = () => {
  return {
    type: GET_PRODUCTS_FAIL
  }
}

export const searchProduct = (keyword) => {
  return {
    type: SEARCH_PRODUCT,
    keyword
  }
}
