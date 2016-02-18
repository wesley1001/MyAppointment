'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class EmployeeList extends Component {


  render() {

    return (
      <View style={{backgroundColor:'white'}}>
        <View style={[{backgroundColor:'white',padding:64,paddingRight:10,paddingLeft:10}]}>
          <View style={styles.cellContainer}>
            <TouchableHighlight onPress={() => this.props.confirmAppointment(this.props.timing)} underlayColor='transparent'>
              <View style={styles.cellWrapper}>
                <View style={styles.middleCol}>
                  <Text>Employee 123</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.separatorWrapper}>
            <View style={styles.separator} />
          </View>
          <View style={styles.cellContainer}>
            <TouchableHighlight onPress={() => this.props.confirmAppointment(this.props.timing)} underlayColor='transparent'>
              <View style={styles.cellWrapper}>
                <View style={styles.middleCol}>
                  <Text>Employee ABC</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );

  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    margin:5
  },
  cellContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:5,
    marginBottom:5
  },
  cellWrapper: {
    flex:5,
  },
  imageContainer: {
    flex:1,
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  titleContainer: {
    flex:4,
    alignSelf:'center'
  },
  title: {
    fontSize: 15,
    textAlign: 'left',
    color: '#DA552F',
  },
  followWrapper: {
    flex:1,
    justifyContent:'flex-end'
  },
  followIcon: {
    height:20,
    width:20,
  },
  separatorWrapper:{
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: 'white',
  },
  separator: {
    height:1,
    backgroundColor:'red',
  },
  middleCol:{
    padding:10
  },

});
