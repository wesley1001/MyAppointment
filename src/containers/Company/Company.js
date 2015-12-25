'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCompany} from './../../actions/Company/company';
import CompanyItem from './../../components/Company/CompanyItem';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Company extends Component {

  constructor(props) {
    super(props);
  }

  loadService(service) {
    Actions.serviceEntity({
      data: service
    });
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <CompanyItem company={this.props.data}/>
        <ServiceList services={this.props.data.services} loadService={this.loadService}/>
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
  const { company } = state
  return {
    ...state,
    company: company,
  }
}

export default connect(mapStateToProps)(Company)
