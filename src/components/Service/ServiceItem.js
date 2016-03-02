'use strict';

import React from 'react-native';
import { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView} from 'react-native';
import { Icon } from 'react-native-icons';
const CalendarPicker = require('react-native-calendar-picker');

export default class ServiceItem extends Component {

  renderContent() {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  render() {
    const {service} = this.props;
    if (service.id && service.id > 0) {
      return this.renderContent(service);
    }
    return <View/>;
  }

}

var styles = StyleSheet.create({
  container: {
  },
  selectedDate: {
  }
});
