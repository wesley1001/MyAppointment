'use strict';

import React, { Component, StyleSheet, Text, TouchableHighlight, View,Image } from 'react-native';
import {connect} from 'react-redux/native';
import {assets} from './../utils/assets';

import {Record} from 'immutable';

export default class Master extends Component {

  render() {
    return (

    <Image source={assets.bg} style={styles.container}>
      <Text style={styles.text}>Push detail view</Text>
    </Image>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    paddingTop:64,
    padding:10
  },
  image: {
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 100,
  },
  text: {
    fontFamily:'Menlo',
    color: '#FFFFFF',
    fontSize:20
  },
});
