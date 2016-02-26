'use strict';

import React, { PropTypes } from 'react';
import { Component,ListView,ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import { Icon } from 'react-native-icons';
import LoadingIndicator from './../LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;
const Modal = require('react-native-modalbox');

export default class AppointmentConfirm extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.showAppointmentConfirmModal) {
      this.refs.appointmentConfirmModal.open();
    } else {
      this.refs.appointmentConfirmModal.close();
    }
  }

  closeModal() {
    this.refs.appointmentConfirmModal.close();
  }

  confirmAppointment() {
    return this.props.onAppointmentConfirm();
  }

  invalidateAppointment() {
    return this.props.inValidateAppointment();
  }

  showAppointmentSuccessText() {
    return (
      <TouchableHighlight underlayColor='transparent' onPress={()=>this.invalidateAppointment()}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontSize:20,color:'#003333' }}> Appointment Confirmed</Text>
        </View>
      </TouchableHighlight>
    );
  }

  showAppointmentButton() {

    const {selectedDate,selectedTime,selectedEmployee,company,user} = this.props;

    return (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontSize:20,color:'#003333' }}>ALMOST DONE !</Text>
        <Text style={{ paddingTop:20, fontSize:13, textAlign:'center',color:'#003333',fontFamily:'menlo',lineHeight:25 }}> You Wanted a
          <Text style={{ color:'#722A2A'}}> {company.service.name_en} </Text>
          <Text style={{ color:'#722A2A'}}> {selectedEmployee.id  ? ' with ' + selectedEmployee.name_en : ''} at </Text>
          <Text style={{ color:'#722A2A'}}> {selectedTime.time_en} </Text> At
          <Text style={{ color:'#722A2A'}}> {company.entity.name_en} </Text> On
          <Text style={{ color:'#722A2A'}}> {selectedDate.toISOString().slice(0, 10)} </Text>
        </Text>

        { user.appointment.error != null ? <Text>Error occured, try again </Text>: <Text/>}
        { user.appointment.isCreating ? <LoadingIndicator /> :
          <TouchableHighlight underlayColor='transparent' onPress={()=>this.confirmAppointment()}>
            <View style={{marginTop:10, height:80,width:80,borderRadius:40,backgroundColor:'#FF4646',justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#E1E3E3',fontFamily:'menlo'}}>
                Book It
              </Text>
            </View>
          </TouchableHighlight>
        }

        <View style={{marginTop:10,marginBottom:10}}>
          <TouchableHighlight underlayColor='transparent' onPress={()=>this.closeModal()}>
            <Text style={{color:'#472036',fontFamily:'menlo',fontSize:10}}>
              Click here to Edit
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );

  }

  render() {
    const {user} = this.props;

    return(
      <Modal
        backdrop={true} backdropOpacity={0.7} backdropColor="black"
        position="center"
        style={{justifyContent:'center',alignItems:'center',height:300,paddingRight:10,paddingLeft:10}}
        ref={"appointmentConfirmModal"}
        swipeToClose={true}
        onClosed={this.props.onClosed}
        backdropContent={
            <Icon
              name='ion|close'
              size={20}
              color={'white'}
              style={{width:20,height:20,alignSelf:'flex-end',fontWeight:700,paddingTop:150,margin:10}}
            />
          }
      >
        { user.appointment.created ?  this.showAppointmentSuccessText() : this.showAppointmentButton() }

      </Modal>
    )
  }
}

