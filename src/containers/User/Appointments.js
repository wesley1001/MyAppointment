'use strict';
import React from 'react';
import { Component, ScrollView, Image, View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchAppointments } from './../../actions/appointments';
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
    if(this.props.auth) {
      if(!this.props.user.isAuthenticated) {
        Actions.loginDialog({
          dialogText:'Please Login to view and manage your Favorites'
        });
      } else {
        const {dispatch} = this.props;
        dispatch(fetchAppointments());
      }
    }

    //<AppointmentList companies={user.favorites.collection} loadCompany={()=>''}/>

  }

  render() {
    console.log('from render');
    const { user } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,paddingTop:64,flexWrap:'wrap'}}>
        {user.favorites.isFetching ? <LoadingIndicator /> : <View />}
        <ConfirmedAppointmentList />
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
