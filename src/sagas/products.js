import { productsURL } from './api';
import { takeLatest } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { GET_PRODUCTS } from '../constants/products';
import { getProductsSuccess, getProductsFail } from '../actions/products';

const selectedCategory = (state) => {
  return state.getIn(['categories', 'selectedCategory'])
}

const fetchProducts = (id) => {
  return fetch(productsURL, {method: 'GET'}).then(res => res.json())
}

function* getProducts() {
  try{
    const categoryId = yield select(selectedCategory);
    const products = yield call(fetchProducts, categoryId);
    yield put(getProductsSuccess(products));
  } catch (error) {
    yield put(getProductsFail())
  }
}

export function* watchGetProducts() {
  yield takeLatest(GET_PRODUCTS, getProducts)
}
