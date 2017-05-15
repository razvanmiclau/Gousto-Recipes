import Immutable from 'immutable';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  SEARCH_PRODUCT
} from '../constants/products';


export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {
      return state.merge({ allProducts: action.products });
    }

    case SEARCH_PRODUCT: {
      return state.merge({ searchbar: action.keyword });
    }

    case GET_PRODUCTS_FAIL: {
      return state.clear()
    }

    default:
      return state;
  }
}
