import { combineReducers } from 'redux-immutable';
import categories from './categories';
import products from './products';

export default combineReducers({
  categories,
  products
})
