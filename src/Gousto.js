import React, { Component } from 'react';
import Immutable from 'immutable';

// Redux Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as categoriesActions from './actions/categories';
import * as productsActions from './actions/products';

// UI
import { Menu, Search, Accordion, Icon } from 'semantic-ui-react'
import _ from 'lodash';

class Gousto extends Component {

  componentWillMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.props.categoriesActions.getCategories();
  }

  selectCategory(category){
    this.props.productsActions.getProducts()
    this.props.categoriesActions.selectCategory(category)
  }

  searchProduct(e){
    this.props.productsActions.searchProduct(e.target.value)
  }

  render() {
    const { categories, searchProduct, selectedCategory, products} = this.props;

    return (
      <div className="App">
        <Menu stackable pointing secondary>
          <div id="menu" className="ui container">
            <Menu.Item header>Gusto</Menu.Item>
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
          </div>
        </Menu>

        <div className="ui main text container">

          {
            !selectedCategory ? <h1 className="ui header">Please select a category from the menu!</h1> :

            <div className="ui padded piled orange segment">
              <header>
                <Search
                  placeholder="search..."
                  showNoResults={false}
                  onSearchChange={this.searchProduct.bind(this)}
                />
              </header>

              <Accordion exclusive={false} fluid styled>
                {
                  _.filter(products, function(product){
                    return _.some(product.categories, function(category){
                      return _.includes(category.id, selectedCategory)
                    })
                  })
                  .filter(product => _.includes(product.title.toLowerCase(), searchProduct.toLowerCase()))
                  .map(product => {
                    return (
                          [
                            <Accordion.Title key="0"><Icon name='dropdown' />{product.title} </Accordion.Title>,
                      <Accordion.Content key="1"><p>{product.description}</p></Accordion.Content>
                          ]
                    )
                  })
                }
              </Accordion>
            </div>
          }

        </div>
      </div>
    ) // end Return
  } // end Render
} // end Class

function mapStateToProps(state) {
  return {
    categories: state.getIn(['categories', 'allCategories', 'data'], Immutable.List()).toJS(),
    products: state.getIn(['products', 'allProducts', 'data'], Immutable.List()).toJS(),
    selectedCategory: state.getIn(['categories', 'selectedCategory'], ''),
    searchProduct: state.getIn(['products', 'searchbar'], '')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gousto)
