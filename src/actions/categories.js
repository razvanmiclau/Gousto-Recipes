import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SELECT_CATEGORY
} from '../constants/categories'

export const getCategories = () => {
  return {
    type: GET_CATEGORIES
  }
}

export const getCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories
  }
}

export const getCategoriesFail = () => {
  return {
    type: GET_CATEGORIES_FAIL
  }
}

export const selectCategory = (category) => {
  return {
    type: SELECT_CATEGORY,
    category
  }
}
