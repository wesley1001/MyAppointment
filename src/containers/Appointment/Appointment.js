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
      date: new Date(),
      time: {},
      selectedEmployee: null,
      appointmentListVisible : false
    };
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

  listEmployees() {
    this.refs.modal1.open();
    //return Actions.employeeList();
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
      <ScrollView contentContainerStyle={{paddingTop:64}} contentInset={{bottom:64}} >
        <Calendar date={this.state.date} onDateChange={this.onDateChange.bind(this)} />
        <TimingList timings={timings}
                    onTimeSelect={this.onTimeSelect.bind(this)}
                    date={this.state.date}
        />
        {! this.state.appointmentListVisible ? <View/> :
          <View>
            <AppointmentList
              company={company}
              date={this.state.date}
              time={this.state.time}
              listEmployees={this.listEmployees.bind(this)}
              selectedEmployee={this.state.selectedEmployee ? this.state.selectedEmployee.name_en : 'Any Employee'}
            />
          </View>
        }

        <Modal
          backdrop={true} backdropOpacity={0.8} backdropColor="black"
          position="center"
          style={{justifyContent:'center',alignItems:'center',height:250}}
          ref={"modal1"}
          swipeToClose={true}
          backdropContent={
            <Icon
              name='ion|close-circled'
              size={20}
              color={'red'}
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
