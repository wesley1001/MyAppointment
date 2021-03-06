'use strict';
import React, { PropTypes } from 'react';
import { Component, View, Image, ScrollView } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchCategories } from './../../actions/Category/categories';
import { assets } from './../../utils/assets';
import CategoryList from './../../components/Category/CategoryList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Categories extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategories());
  }

  loadCategory(category) {
    Actions.categoryEntity({
      title:category.name,
      categoryProp:category
      //data: category
    });
  }

  render() {
    const { categories,categoriesReducer } = this.props;
    return (
      <Image source={assets.lotus} style={{
        flex: 1,
        width:null,
        height:null,
        paddingTop:100,
        paddingBottom:100,
        flexWrap:'wrap'
      }}
      >
        {categoriesReducer.isFetching ? <LoadingIndicator  /> : <View/>}
        <CategoryList categories={categories} loadCategory={this.loadCategory}/>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  const { entities,categoriesReducer } = state;
  return {
    categoriesReducer,
    categories:entities.categories
  }
}

export default connect(mapStateToProps)(Categories);
