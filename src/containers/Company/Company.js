'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView,SegmentedControlIOS,AlertIOS } from 'react-native';
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

  loadService(company,service) {
    // @todo :replace company with reducer company
    Actions.serviceEntity({
      title:service.name,
      data: service,
      companyData: company
    });
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }


  render() {

    const {data} = this.props;

    let mapPin = {
      title:data.name,
      subtitle:data.location,
      latitude:parseFloat(data.latitude),
      longitude:parseFloat(data.longitude)
    };

    let selectedComponent;

    if(this.state.selectedIndex === 1) {
      selectedComponent = <CompanyDescription company={data} />
    } else if(this.state.selectedIndex === 2) {
      selectedComponent = <CompanyMap pin={mapPin} />
    } else {
      selectedComponent = <ServiceList company={data} services={data.services} loadService={this.loadService.bind(this)} />
    }

    return (

      <ScrollView contentContainerStyle={[styles.container]}>
        <CompanyItem company={this.props.data}/>
        <View style={{margin:5,marginTop:20}}>
          <SegmentedControlIOS values={['Services', 'Description', 'Map']} tintColor="rgb(217, 102, 255)" momentary={true} selectedIndex={0}
                               onChange={this.onChange}
          />

          {selectedComponent}

        </View>
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row'
  }
});

function mapStateToProps(state) {
  const { company } = state;
  return {
    ...state,
    company: company
  }
}

export default connect(mapStateToProps)(Company);
