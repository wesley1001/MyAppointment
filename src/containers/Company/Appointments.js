'use strict';
import React from 'react';
import { Component, ScrollView, Image, View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchAppointments } from './../../actions/appointments';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Appointments extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchAppointments());
  }

  render() {

    const { user } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,flexWrap:'wrap'}}>
        {user.favorites.isFetching ? <LoadingIndicator /> : <View />}
        <AppointmentList companies={user.favorites.collection} loadCompany={()=>''}/>
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
