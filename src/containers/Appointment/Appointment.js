'use strict';

import React from 'react';
import { Component,ScrollView,AlertIOS,Modal } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import ServiceItem from './../../components/Service/ServiceItem';
import Calendar from './../../components/Calendar';
import TimingList from './../../components/TimingList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { fetchTiming } from './../../actions/timings';
import { createAppointment } from './../../actions/appointments';
const Actions = require('react-native-router-flux').Actions;

class Appointment extends Component {

  constructor(props) {
    super(props);
    this.state={
      date: new Date(),
      time: 0
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTiming());
  }

  onDateChange(date) {
    const {dispatch,companyData,data} = this.props;
    this.setState({ date: date });
  }

  // fetch timings
  onTimeSelect(time) {
    this.setState({ time: time });
  };

  makeAppointment() {
    //AlertIOS.alert('confirm your booking ? ', null, [{text: 'Yes', onPress:()=>{this.handleConfirm(timing)}},{text:'No'}]);
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

  render() {
    const {timings,employees,company} = this.props;
    return (
      <ScrollView style={{ flex:1,paddingTop:64}}>
        <Calendar date={this.state.date} onDateChange={this.onDateChange.bind(this)} />
        <TimingList timings={timings}
                    onConfirm={this.handleConfirm.bind(this)}
                    onTimeSelect={this.onTimeSelect.bind(this)}
                    date={this.state.date}
        />
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return {
    ...state,
    timings:state.timings,
    company:state.company.entity,
    employees:state.company.entity.employees,
    services:state.company.entity.services,
  }
}

export default connect(mapStateToProps)(Appointment)
