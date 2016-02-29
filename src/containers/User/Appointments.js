'use strict';
import React from 'react';
import { Component, ScrollView, Image, View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchAppointments,cancelAppointment } from './../../actions/appointments';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import ConfirmedAppointmentList from './../../components/Appointment/ConfirmedAppointmentList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Appointments extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.props.user.isAuthenticated) {
      Actions.loginDialog({ dialogText:'Please login to manage your Appointments'});
    } else {
      this.props.dispatch(fetchAppointments());
    }
  }

  cancelAppointment(appointment) {
    this.props.dispatch(cancelAppointment(appointment.id));
  }

  render() {
    const { user } = this.props;

    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,paddingTop:64,flexWrap:'wrap'}}>
        {user.appointments.isFetching ? <LoadingIndicator /> : <View />}
        <ConfirmedAppointmentList appointments={user.appointments} cancelAppointment={this.cancelAppointment.bind(this)} />
      </Image>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    user:state.user
  }
}

export default connect(mapStateToProps)(Appointments);
