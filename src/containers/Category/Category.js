'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCategory} from './../../actions/Category/category';
import CategoryItem from './../../components/Category/CategoryItem';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
  }

  loadCompany(company) {
    Actions.companyEntity({
      data: company
    });
  }

  render() {

    const {category} = this.props;

    if (category.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView style={styles.container}>
        <CategoryItem category={this.props.data}/>
        <CompanyList companies={this.props.data.companies} loadCompany={this.loadCompany.bind(this)}/>
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
