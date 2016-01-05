'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView,SegmentedControlIOS,AlertIOS } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchCompany} from './../../actions/Company/company';
import CompanyItem from './../../components/Company/CompanyItem';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
import CompanyMap from './../../components/Company/CompanyMap';
const Actions = require('react-native-router-flux').Actions;

class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex : 0
    };
    this.onChange = this.onChange.bind(this);
    this.confirmAppointment = this.confirmAppointment.bind(this);
  }

  loadService(service) {
    Actions.serviceEntity({
      title:service.name,
      data: service
    });
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }

  confirmAppointment(service) {

    Actions.serviceEntity({
      title:service.name,
      data: service
    });

    //AlertIOS.alert('confirm your booking ? ', null, [{text: 'Yes', onPress:()=>{this.handleConfirm()}},{text:'No'}]);

  }

  handleConfirm(){

  }

  render() {
    const {data} = this.props;
    let mapPin = {
      title:data.name,
      subtitle:data.location,
      latitude:parseFloat(data.latitude),
      longitude:parseFloat(data.longitude)
    };

    return (

      <ScrollView style={styles.container}>
        <CompanyItem company={this.props.data}/>
        <View style={{margin:5,marginTop:20}}>
          <SegmentedControlIOS values={['Services', 'Map']} tintColor="rgb(217, 102, 255)" momentary={true} selectedIndex={this.state.selectedIndex}
                               onChange={this.onChange}
          />

          {this.state.selectedIndex === 0 ?
            <ServiceList services={this.props.data.services} loadService={this.loadService.bind(this)} confirmAppointment={this.confirmAppointment.bind(this)}/>
            :
            <CompanyMap pin={mapPin} />}

        </View>
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
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
