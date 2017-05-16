# Gousto-Recipes
Simple React | Redux application retrieving a list of recipes from an external API.

## Setup

In the project directory run the following command to install all the required dependencies to run this project:

#### `npm install`

Once you've installed the required dependencies, you can run the app locally using:

#### `npm start`

*** Make sure you have disabled cross-origins restrictions on the web browser.


## Folder Structure

```
Gousto/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    Gousto.js
    index.js
    store.js
    actions/
      categories.js
      products.js
    constants/
      categories.js
      products.js
    reducers/
      categories.js
      products.js
      rootReducer.js
    sagas/
      api.js
      categories.js
      products.js
      rootSaga.js
    styles/
      index.css
```

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point - This will render the `<Gousto />` component to the page template.

## How it works

This project uses the Redux library to handle the state management of the app. We have wrapped-up our main component <Gusto /> within a `<Provider />` component, which provides access the data structure holding the state.

Before the page is rendered, the main component dispatches an action `getCategories()`.

```
componentWillMount() {
    this.fetchCategories();
  }

fetchCategories() {
    this.props.categoriesActions.getCategories();
}
```

Whenever we dispatch an action from our user interface, a middleware called `rootSaga` will intercept it - Based on the action type it receives, a generator function will fetch the data and will pass it to another action as a payload.

```
function* getCategories() {
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
```

In this example, we assign to a constant the value received from the `fetchCategories()`. This function returns a promise with the json data that was fetched from the API.
Then it dispatches a new action with the categories data.

The Reducer will then intercept that along with its payload, and will create a new updated copy of the previous state.

```
export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      return state.merge({ allCategories: action.categories });
    }
}
```

The state should now look like this:
```
[
  categories: {
    allCategories : {data: [{...}, {...}, ...]}
  }
]
```

Whenever the state changes, the DOM will re-render the updated elements from the view.

### Updating the view
Our main react component `<Gousto />` can access the state via its props, thanks to the `mapStateToProps(state)` function.

```
const { categories } = this.props
-------------------------------------------->
function mapStateToProps(state) {
  return {
    categories: state.getIn(['categories', 'allCategories', 'data'], Immutable.List()).toJS(),
  }
}
```

In this example, we take only the array of elements from the data, and assign it to a categories object that's accessible from the props.

The view displays a list of all categories by mapping through the categories array and returning `<Menu.Item />` component for each element.

```
{
 categories.map(category => {
   return (
   	  <Menu.Item
      	key={category.id}
        name={category.title}
        active={selectedCategory === category.id}
        onClick={this.selectCategory.bind(this, category)}
      />
    )
  })
}
```

### Displaying a list of products
In order to display a list of products specific to the category we selected, we dispatch two actions whenever we click on a category from the menu.

```
selectCategory(category){
    this.props.productsActions.getProducts()
    this.props.categoriesActions.selectCategory(category)
}
```
We want to retrieve a list of all products from the API and pass it  to our Redux Store, just like we did with the categories. However, in this case we also want to pass the selected category.

```
case SELECT_CATEGORY: {
	return state.merge({ selectedCategory: action.category.id });
}
```
In the reducer, we pass to the store the selected category id, as well as a list of all products. 

The state should now look like this:
```
[
  categories: {
    allCategories : {data: [{...}, {...}, ...]},
    selectedCategory: "id_string..."
  },
  products: {
  	allProducts : {data: [{...}, {...}, ...]},
  }
]
```

To display only the products related to the selected category we filter through the data directly on the view, by using helpers from the _lodash library.

```
{
	_.filter(products, function(product){
    	return _.some(product.categories, function(category){
        	return _.includes(category.id, selectedCategory)
        })
    })
    .filter(product => 
    	_.includes(product.title.toLowerCase(), searchProduct.toLowerCase()))
    .map(product => 
    	{ return 
        [<Accordion.Title key="0"><Icon name='dropdown' />{product.title}</Accordion.Title>, <Accordion.Content key="1"><p>{product.description}</p></Accordion.Content>]
         }
}
```
In this example, we first check if the categories array belonging to a product contains an id that is equal to the selected category id we passed to the store. The second filter checks whether the product's title matches the keyword typed into the search bar. Lastly, we map through the filtered products array and pass the relevant data to the view.

The list automatically updates as we type into the search bar.

```
<Search
	onSearchChange={this.searchProduct.bind(this)}
/>
```

The Search Component has an onSearchChange prop which takes the `searchProduct` function. Just like we previously did with the selected category, this dispatches an action with the contents of the search bar as its payload.

```
searchProduct(e){
    this.props.productsActions.searchProduct(e.target.value)
}
```

The reducer adds to the state the new keyword. 

```
case SEARCH_PRODUCT: {
	return state.merge({ searchbar: action.keyword });
}
```

The state should now look like this:
```
[
  categories: {
    allCategories : {data: [{...}, {...}, ...]},
    selectedCategory: "id_string..."
  },
  products: {
  	allProducts : {data: [{...}, {...}, ...]},
    searchBar : "keyword_string..."
  }
]
```
