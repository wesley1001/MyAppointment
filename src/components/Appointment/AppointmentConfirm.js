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
      console.log('app modal visible');
    } else {
      console.log('app modal not visible');
      this.refs.appointmentConfirmModal.close();
    }

  }

  render() {
    const {employees,onEmployeeSelect} = this.props;

    return(
      <Modal
        backdrop={true} backdropOpacity={0.8} backdropColor="black"
        position="bottom"
        style={{justifyContent:'flex-start',height:400}}
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
        <Text>Almost Done !</Text>
        <Text>You Wanted a Keratin at 5:05 PM At Lusso Salon & Spa On February 26th,2016</Text>
        <Text>Book It</Text>
      </Modal>
    )
  }
}

