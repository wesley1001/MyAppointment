'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView,AlertIOS } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import ServiceItem from './../../components/Service/ServiceItem';
import Calendar from './../../components/Calendar';
import TimingList from './../../components/TimingList';
import LoadingIndicator from './../../components/LoadingIndicator';
import {fetchTiming} from './../../actions/timings';
import {createAppointment} from './../../actions/appointments';
const Actions = require('react-native-router-flux').Actions;

class Service extends Component {

  constructor(props) {
    super(props);
    this.state={
      date: new Date()
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    const {dispatch,companyData,data} = this.props;
    dispatch(fetchTiming(this.state.date,companyData.id,data.id));
  }

  handleConfirm(timing) {
    const date = this.state.date;
    const {dispatch} = this.props;
    let user = {}; //@todo : get from reducer
    user.id=1;
    dispatch(createAppointment(date,user.id,timing.id, (cb) => {
      if(cb.success) {
        AlertIOS.alert('Booking Confirmed on '+this.state.date.toISOString().slice(0, 10)+' at '+timing.time, null, [{text: 'OK'}]);
        Actions.pop();
      } else {
        AlertIOS.alert('Booking Failed ? try again ', null, [{text: 'OK'}]);
      }
    }));
  }

  onDateChange(date) {
    const {dispatch,companyData,data} = this.props;
    this.setState({ date: date });
    dispatch(fetchTiming(this.state.date,companyData.id,data.id));
  }

  render() {
    const {timings,appointments} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Calendar date={this.state.date} onDateChange={this.onDateChange.bind(this)} />
        <View style={styles.separator}/>
        <View style={styles.timingHeading}>
          <Text style={styles.timingLabel}>Available Appointment on {this.state.date.toISOString().slice(0, 10)} </Text>
        </View>
        <View style={[styles.separator,{marginBottom:10}]}/>
        {timings.isFetching || appointments.isFetching ? <LoadingIndicator /> :  <TimingList timings={timings.entity}  onConfirm={this.handleConfirm.bind(this)} />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    margin:10
  },
  timingHeading: {
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10
  },
  timingLabel:{
    fontSize:18,
    color:'purple'
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8'
  },
});

function mapStateToProps(state) {
  const { service,timings,appointments } = state
  return {
    ...state,
    service: service,
    timings:timings,
    appointments:appointments
  }
}

export default connect(mapStateToProps)(Service)
