'use strict';

import React, { PropTypes } from 'react';
import { Component, StyleSheet, Text, View, ScrollView, SegmentedControlIOS } from 'react-native';
import {connect} from '../../../node_modules/react-redux';
import {fetchCompany} from './../../actions/Company/company';
import CompanyItem from './../../components/Company/CompanyItem';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
import CompanyMap from './../../components/Company/CompanyMap';
import CompanyDescription from './../../components/Company/CompanyDescription';
const Actions = require('react-native-router-flux').Actions;

class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex : 0
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCompany(this.props.id));
  }

  loadDateTime(service) {
    Actions.appointmentContainer({
      title:service.name,
      serviceID: service.id
    });
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }


  render() {
    const {company } = this.props;

    if(company.isFetching) {
      return ( <LoadingIndicator />);
    }  else {
      let mapPin = {
        title:company.entity.name,
        subtitle:company.entity.location,
        latitude:parseFloat(company.entity.latitude),
        longitude:parseFloat(company.entity.longitude)
      };

      let selectedComponent;

      if(this.state.selectedIndex === 1) {
        selectedComponent = <CompanyDescription company={company.entity} />
      } else if(this.state.selectedIndex === 2) {
        selectedComponent = <CompanyMap pin={mapPin} />
      } else {
        selectedComponent = <ServiceList company={company.entity} services={company.entity.services} selectDateTime={this.loadDateTime.bind(this)} />
      }

      return (
        <ScrollView contentContainerStyle={[styles.container]}>
          <CompanyItem company={company.entity}/>
          <View style={{margin:5,marginTop:20}}>
            <SegmentedControlIOS values={['Services', 'Description', 'Map']} tintColor="#99ddff" momentary={true} selectedIndex={0}
                                 onChange={this.onChange}
            />
            {selectedComponent}
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64
  }
});

function mapStateToProps(state) {
  return {
    ...state,
    company: state.company
  }
}

export default connect(mapStateToProps)(Company);
