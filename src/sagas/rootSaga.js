import { watchGetCategories } from './categories';
import { watchGetProducts } from './products';

export default function* rootSaga () {
  yield [
    watchGetCategories(),
    watchGetProducts()
  ]
}
