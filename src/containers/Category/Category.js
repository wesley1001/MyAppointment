'use strict';
import React, {PropTypes} from 'react';
import { Component, Image, StyleSheet, View } from 'react-native';
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

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategory(this.props.id));
  }

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      id: company.id
    });
  }

  render() {
    const {category} = this.props;
    return (
        <Image source={assets.bg} style={styles.container}>
          {category.isFetching ? <LoadingIndicator /> : <View />}
          <CompanyList companies={this.props.category.entity.companies} loadCompany={this.loadCompany.bind(this)}/>
        </Image>
    );
  }
}


Category.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
  }
});

function mapStateToProps(state) {
  return {
    ...state,
    category: state.category
  }
}

export default connect(mapStateToProps)(Category);
