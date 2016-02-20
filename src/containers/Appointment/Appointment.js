'use strict';

import React, {PropTypes} from 'react';
import { Component,ScrollView,AlertIOS,Modal,View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import ServiceItem from './../../components/Service/ServiceItem';
import Calendar from './../../components/Appointment/Calendar';
import TimingList from './../../components/Appointment/TimingList';
import AppointmentList from './../../components/Appointment/AppointmentList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { fetchTiming } from './../../actions/timings';
import { createAppointment } from './../../actions/appointments';
const Actions = require('react-native-router-flux').Actions;

class Appointment extends Component {

  constructor(props) {
    super(props);
    this.state={
      date: new Date(),
      time: {},
      appointmentListVisible : false
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTiming());
  }

  onDateChange(date) {
    this.setState({ date: date });
  }

  // fetch timings
  onTimeSelect(time) {
    this.setState({ time: time });
    this.setState({ appointmentListVisible : true})
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
      <ScrollView contentContainerStyle={{paddingTop:64}} contentInset={{bottom:64}} >
        <Calendar date={this.state.date} onDateChange={this.onDateChange.bind(this)} />
        <TimingList timings={timings}
                    onConfirm={this.handleConfirm.bind(this)}
                    onTimeSelect={this.onTimeSelect.bind(this)}
                    date={this.state.date}
        />
        {! this.state.appointmentListVisible ? <View/> :
          <AppointmentList
            company={company}
            date={this.state.date}
            time={this.state.time}
            employees={employees}
          />
        }

      </ScrollView>
    );
  }
}

Appointment.propTypes = {
  timings : PropTypes.object,
  employees: PropTypes.array,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state,
    timings:state.timings,
    company:state.company,
    employees:state.company.entity.employees
  }
}

export default connect(mapStateToProps)(Appointment)
