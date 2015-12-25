'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCategories} from './../../actions/Category/categories';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Companies extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    //dispatch(fetchCompanies(this.props.data.id));
  }

  loadCompany(company) {
    Actions.companyEntity({
      data: company
    });
  }

  render() {

    const { companies,data } = this.props;

    if (companies.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <View >
        <CompanyList companies={data} loadCompany={this.loadCompany.bind(this)}/>
      </View>
    );

  }
}

function mapStateToProps(state) {
  const { companies } = state
  return {
    ...state,
    companies: companies,
  }
}

export default connect(mapStateToProps)(Companies)