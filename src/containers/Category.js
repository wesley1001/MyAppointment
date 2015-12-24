'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView } from 'react-native';
import {connect} from 'react-redux/native';
import {fetchCategory} from './../actions/category';
import CategoryItem from './../components/Category/CategoryItem';
import LoadingIndicator from './../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    //dispatch(fetchCategory(this.props.data.id));
  }

  render() {

    const {category} = this.props;

    if (category.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView style={styles.container}>
        <CategoryItem category={this.props.data}/>
      </ScrollView>
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
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
