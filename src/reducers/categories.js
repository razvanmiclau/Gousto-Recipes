import Immutable from 'immutable';
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SELECT_CATEGORY
} from '../constants/categories';


export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      return state.merge({ allCategories: action.categories });
    }

    case SELECT_CATEGORY: {
      return state.merge({ selectedCategory: action.category.id });
    }

    case GET_CATEGORIES_FAIL: {
      return state.clear()
    }

    default:
      return state;
  }
}
