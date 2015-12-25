'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCategory} from './../../actions/Category/category';
import CategoryItem from './../../components/Category/CategoryItem';
import Companies from './../Company/Companies';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
  }

  render() {

    const {category} = this.props;

    if (category.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView style={styles.container}>
        <CategoryItem category={this.props.data}/>
        <Companies data={this.props.data.companies}/>
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  const { category } = state
  return {
    ...state,
    category: category,
  }
}

export default connect(mapStateToProps)(Category)
