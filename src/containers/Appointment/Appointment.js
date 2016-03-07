'use strict';
import React, { PropTypes } from 'react';
import { Component,ScrollView,AlertIOS,View,Text } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchTiming } from './../../actions/timings';
import { createAppointment,invalidateCreatedAppointment } from './../../actions/appointments';
import { Icon } from 'react-native-icons';
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
      showAppointmentConfirmModal : false
    };
  }

  componentWillMount() {
    if(!this.props.userReducer.isAuthenticated) {
      Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
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
    this.props.dispatch(createAppointment(this.props.companyProp,this.props.serviceProp,this.state.selectedDate,this.state.selectedTime,this.state.selectedEmployee))
      .then(()=>console.log('success'))
      .catch(()=>console.log('error'));
  }

  render() {

    const {timings,employees,company,userReducer,service,timingReducer} = this.props;
    return (
      <ScrollView contentContainerStyle={{paddingTop:64}} contentInset={{bottom:49}} ref="scrollView">

        <Calendar
          selectedDate={this.state.selectedDate}
          onDateChange={this.onDateChange.bind(this)}
        />

        <AppointmentList
          service={service}
          selectedEmployee={this.state.selectedEmployee}
          listEmployees={this.listEmployees.bind(this)}
        />

        <TimingList
          timings={timings}
          selectedTime={this.state.selectedTime}
          onTimeSelect={this.onTimeSelect.bind(this)}
          timingReducer={timingReducer}
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
          userReducer={userReducer}
          service={service}
        />

      </ScrollView>
    );
  }
}

Appointment.propTypes = {
  timings : PropTypes.object.isRequired,
  timingReducer : PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  companyProp: PropTypes.object.isRequired,
  userReducer:PropTypes.object.isRequired,
  serviceProp:PropTypes.object.isRequired
};

function mapStateToProps(state,ownProps) {
  const {entities} = state;
  return {
    ...state,
    timings:entities.timings,
    company:entities.companies[ownProps.companyProp.id],
    service:entities.services[ownProps.serviceProp.id],
    employees:entities.companies[ownProps.companyProp.id].employees ? entities.companies[ownProps.companyProp.id].employees.map((employee)=>entities.employees[employee]) : [],
    timingReducer:state.timingReducer,
    userReducer:state.userReducer,
  }
}

export default connect(mapStateToProps)(Appointment)
