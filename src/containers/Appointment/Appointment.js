'use strict';

import React, { PropTypes } from 'react';
import { Component,ScrollView,AlertIOS,View,Text } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchTiming } from './../../actions/timings';
import { createAppointment } from './../../actions/appointments';
import { Icon } from 'react-native-icons';
import ServiceItem from './../../components/Service/ServiceItem';
import Calendar from './../../components/Appointment/Calendar';
import TimingList from './../../components/Appointment/TimingList';
import AppointmentList from './../../components/Appointment/AppointmentList';
import AppointmentConfirm from './../../components/Appointment/AppointmentConfirm';
import EmployeePicker from './../../components/Company/EmployeePicker';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Appointment extends Component {

  constructor(props) {
    super(props);
    this.state={
      selectedDate: new Date(),
      selectedTime: {},
      selectedEmployee: {},
      showEmployeeListModal : false,
      showAppointmentConfirmModal : false,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTiming());
  }

  listEmployees() {
    this.refs.scrollView.scrollTo({x: 0});
    this.setState({ showEmployeeListModal:true });
  }

  onDateChange(date) {
    this.setState({ selectedDate: date });
  }

  onTimeSelect(time) {
    this.refs.scrollView.scrollTo({x: 0});

    this.setState({
      selectedTime: time,
      showAppointmentConfirmModal:true
    });
    console.log(this.state.showAppointmentConfirmModal);
  };

  onEmployeeSelect(employee){
    this.setState({
      selectedEmployee:employee,
      showEmployeeListModal:false
    });
  }

  onEmployeeListModalClosed() {
    this.setState({showEmployeeListModal:false});
  }

  onAppointmentConfirmModalListClosed() {
    this.setState({showAppointmentConfirmModal:false});
  }

  //makeAppointment() {
  //AlertIOS.alert('confirm your booking ? ', null, [{text: 'Yes', onPress:()=>{this.handleConfirm(timing)}},{text:'No'}]);
  //}


  //handleConfirm(timing) {
  //  const date = this.state.date;
  //  const {dispatch} = this.props;
  //  let user = {}; //@todo : get from reducer
  //  user.id=1;
  //  dispatch(createAppointment(date,user.id,timing.id, (cb) => {
  //    if(cb.success) {
  //      AlertIOS.alert('Booking Confirmed on '+this.state.date.toISOString().slice(0, 10)+' at '+timing.time, null, [{text: 'OK'}]);
  //      Actions.pop();
  //    } else {
  //      AlertIOS.alert('Booking Failed ? try again ', null, [{text: 'OK'}]);
  //    }
  //  }));
  //}

  render() {

    const {timings,employees,company} = this.props;
    return (
      <ScrollView contentContainerStyle={{paddingTop:64}} contentInset={{bottom:49}} ref="scrollView">

        <Calendar
          selectedDate={this.state.selectedDate}
          onDateChange={this.onDateChange.bind(this)}
        />

        <AppointmentList
          company={company}
          selectedEmployee={this.state.selectedEmployee}
          listEmployees={this.listEmployees.bind(this)}
          selectedDate={this.state.selectedDate}
        />

        <TimingList
          timings={timings}
          selectedDate={this.state.selectedDate}
          selectedTime={this.state.selectedTime}
          onTimeSelect={this.onTimeSelect.bind(this)}
        />

        <EmployeePicker
          employees={employees}
          onEmployeeSelect={this.onEmployeeSelect.bind(this)}
          onClosed={this.onEmployeeListModalClosed.bind(this)}
          showEmployeeListModal={this.state.showEmployeeListModal}
        />

        <AppointmentConfirm
          employees={employees}
          onEmployeeSelect={this.onEmployeeSelect.bind(this)}
          onClosed={this.onAppointmentConfirmModalListClosed.bind(this)}
          showAppointmentConfirmModal={this.state.showAppointmentConfirmModal}
        />

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
