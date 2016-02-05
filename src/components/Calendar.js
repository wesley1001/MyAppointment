'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

var CalendarPicker = require('react-native-calendar-picker');


export default class Calendar extends Component {


  handleDateChange = (date) =>{
    this.props.onDateChange(date);
  };

  render() {
    const {date} = this.props;
    return (
        <CalendarPicker
          selectedDate={date}
          onDateChange={this.handleDateChange} />
    );

  }

}

var styles = StyleSheet.create({

});
