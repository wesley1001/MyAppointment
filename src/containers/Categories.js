'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux/native';
import {fetchCategories} from './../actions/categories';
import CategoryList from './../components/Category/CategoryList';
import LoadingIndicator from './../components/LoadingIndicator';
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
      data: category
    });
  }

  render() {

    const {  categories } = this.props;

    if (categories.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <CategoryList categories={categories.collection} loadCategory={this.loadCategory}/>
    );

  }
}

function mapStateToProps(state) {
  const { categories } = state
  return {
    ...state,
    categories: categories,
  }
}

export default connect(mapStateToProps)(Categories)
