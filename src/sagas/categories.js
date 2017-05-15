import { categoriesURL } from './api';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { GET_CATEGORIES } from '../constants/categories';
import { getCategoriesSuccess, getCategoriesFail } from '../actions/categories';

export const fetchCategories = () => {
  return fetch(categoriesURL).then(res => res.json())
}

export function* getCategories() {
  try{
    const categories = yield call(fetchCategories);
    yield put(getCategoriesSuccess(categories));
  } catch (error) {
    yield put(getCategoriesFail())
  }
}

export function* watchGetCategories() {
  yield takeLatest(GET_CATEGORIES, getCategories)
}
