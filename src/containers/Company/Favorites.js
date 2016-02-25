'use strict';
import React, { Component, StyleSheet, Text, View } from 'react-native';
import {connect} from '../../../node_modules/react-redux';
import {fetchCategories} from './../../actions/Category/categories';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Favorites extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    //dispatch(fetchCompanies(this.props.data.id));
  }

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      data: company
    });
  }

  render() {

    const { companies,data } = this.props;

    if (companies.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView contentContainerStyle={[styles.container]}>
        <CompanyList companies={data} loadCompany={this.loadCompany.bind(this)}/>
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container:{
    margin:5
  }
});

function mapStateToProps(state) {
  const { companies } = state
  return {
    ...state,
    companies: companies,
  }
}

export default connect(mapStateToProps)(Favorites)
