'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from '../../../node_modules/react-redux/native';
import {fetchServices} from './../../actions/Service/services';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Services extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    //dispatch(fetchServices());
  }

  loadService(service) {
    Actions.serviceEntity({
      data: service
    });
  }

  render() {

    const {  services } = this.props;

    if (services.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ServiceList services={this.props.data} loadService={this.loadService}/>
    );

  }
}

function mapStateToProps(state) {
  const { services } = state
  return {
    ...state,
    services: services,
  }
}

export default connect(mapStateToProps)(Services)
