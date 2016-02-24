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
import EmployeeList from './../../components/Company/EmployeeList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;
const Modal = require('react-native-modalbox');

class Appointment extends Component {

  constructor(props) {
    super(props);

    this.state={
      selectedDate: new Date(),
      selectedTime: {},
      selectedEmployee: null,
      appointmentListVisible : false
    };
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTiming());
    // set initial time
    //if(this.props.timings) {
    //  this.setState({
    //    time:this.props.timings.collection[0],
    //    appointmentListVisible : true
    //  });
    //}
  }

  onDateChange(date) {
    this.setState({ selectedDate: date });
  }

  // fetch timings
  onTimeSelect(time) {
    this.setState({ selectedTime: time });
    this.setState({ appointmentListVisible : true});
  };

  listEmployees() {
    this.refs.scrollView.scrollTo({x: 0,animated:true});
    this.refs.modal1.open();
  }

  onEmployeeSelect(employee){
    this.setState({
      selectedEmployee:employee
    });
    this.refs.modal1.close();
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
      <ScrollView contentContainerStyle={{paddingTop:64}} contentInset={{bottom:64}} ref="scrollView">

        <Calendar selectedDate={this.state.selectedDate} onDateChange={this.onDateChange.bind(this)} />

        <TimingList timings={timings}
                    onTimeSelect={this.onTimeSelect.bind(this)}
                    selectedDate={this.state.selectedDate}
                    selectedTime={this.state.selectedTime}
        />

        {! this.state.appointmentListVisible ? <View/> :
          <AppointmentList
            company={company}
            listEmployees={this.listEmployees.bind(this)}
            selectedEmployeeName={this.state.selectedEmployee ? this.state.selectedEmployee.name_en : 'Any'}
          />
        }

        <Modal
          backdrop={true} backdropOpacity={0.8} backdropColor="black"
          position="bottom"
          style={{justifyContent:'flex-start',height:400}}
          ref={"modal1"}
          swipeToClose={true}
          backdropContent={
            <Icon
              name='ion|close'
              size={20}
              color={'white'}
              style={{width:20,height:20,alignSelf:'flex-end',fontWeight:700,paddingTop:150,margin:10}}
            />
          }
        >
          <EmployeeList
            employees={employees}
            onEmployeeSelect={this.onEmployeeSelect.bind(this)}
          />
        </Modal>

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
