'use strict';
import React, { Component, View, Image, StyleSheet, ScrollView } from 'react-native';
import {connect} from '../../../node_modules/react-redux';
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
      title:category.name,
      data: category
    });
  }

  render() {

    const { categories } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={assets.logo} style={styles.logo} />
        </View>
        {categories.isFetching ? <LoadingIndicator  /> : <View/>}
        <CategoryList categories={categories.collection} loadCategory={this.loadCategory}/>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    paddingTop:20,
    paddingBottom:49,
  },
  logoWrapper:{
    alignItems:'center'
  },
  logo: {
    width:150,
    height:150,
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
