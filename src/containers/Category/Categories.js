'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCategories} from './../../actions/Category/categories';
import CategoryList from './../../components/Category/CategoryList';
import LoadingIndicator from './../../components/LoadingIndicator';
import {assets} from './../../utils/assets';
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

    const { categories } = this.props;


    return (
      <Image source={assets.bg} style={styles.container}>


        {categories.isFetching ? <LoadingIndicator /> : <View/>}


        <CategoryList categories={categories.collection} loadCategory={this.loadCategory}/>


      </Image>


    );

  }
}

const styles = StyleSheet.create({
  //
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10
  }

});

function mapStateToProps(state) {
  const { categories } = state
  return {
    ...state,
    categories: categories,
  }
}

export default connect(mapStateToProps)(Categories)
