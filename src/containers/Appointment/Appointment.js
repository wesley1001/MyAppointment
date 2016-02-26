'use strict';

import React, { PropTypes } from 'react';
import { Component,ScrollView,AlertIOS,View,Text } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchTiming } from './../../actions/timings';
import { createAppointment,invalidateCreatedAppointment } from './../../actions/appointments';
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
    dispatch(invalidateCreatedAppointment());
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


  inValidateAppointment() {
    const {dispatch} = this.props;
    dispatch(invalidateCreatedAppointment());
    Actions.pop();
  }

  handleConfirm() {
    const {dispatch,user} = this.props;

    Promise.all([
      dispatch(createAppointment(this.state.selectedDate,this.state.selectedTime,this.state.selectedEmployee))
    ]).then(()=>console.log('success'))
      .catch(()=>console.log('error'));
  }

  render() {

    const {timings,employees,company,user} = this.props;
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
          company={company}
          selectedEmployee={this.state.selectedEmployee}
          selectedTime={this.state.selectedTime}
          selectedDate={this.state.selectedDate}
          onClosed={this.onAppointmentConfirmModalListClosed.bind(this)}
          showAppointmentConfirmModal={this.state.showAppointmentConfirmModal}
          onAppointmentConfirm={this.handleConfirm.bind(this)}
          inValidateAppointment={this.inValidateAppointment.bind(this)}
          user={user}
        />

      </ScrollView>
    );
  }
}

Appointment.propTypes = {
  timings : PropTypes.object,
  employees: PropTypes.array,
  company: PropTypes.object,
  user:PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state,
    timings:state.timings,
    company:state.company,
    employees:state.company.entity.employees,
    user:state.user
  }
}

export default connect(mapStateToProps)(Appointment)
