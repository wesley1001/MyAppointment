'use strict';

import React, { Component, Image, StyleSheet, View } from 'react-native';
import {connect} from '../../../node_modules/react-redux';
import {fetchCategory} from './../../actions/Category/category';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
import {assets} from './../../utils/assets';
const Actions = require('react-native-router-flux').Actions;

class Category extends Component {

  constructor(props) {
    super(props);

  }

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      data: company
    });
  }

  render() {

    const {category} = this.props;

    return (
        <Image source={assets.bg} style={styles.container}>
          {category.isFetching ? <LoadingIndicator /> : <View />}
          <CompanyList companies={this.props.data.companies} loadCompany={this.loadCompany.bind(this)}/>
        </Image>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
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
