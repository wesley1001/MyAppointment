'use strict';
import React, {PropTypes} from 'react';
import { Component, TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-icons';
import LoadingIndicator from './../../components/LoadingIndicator';
import Seperator from './../Seperator';
const Actions = require('react-native-router-flux').Actions;

export default class ConfirmedAppointmentList extends Component {

  logout = () => {};

  render() {
    const {listEmployees} = this.props;
    return (
      //<Icon
      //  name='ion|person'
      //  size={40}
      //  color={'white'}
      //  style={{width:40,height:40,alignSelf:'center',fontWeight:100}}
      ///>

      <View style={styles.cellContainer}>
        <View style={styles.cellWrapper}>
          <View style={styles.leftCol}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='ion|calendar'
                size={20}
                color={'red'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
              />
              <Text style={styles.month}>July</Text>
            </View>
            <Text style={styles.day}>5</Text>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='ion|clock'
                size={20}
                color={'purple'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
              />
              <Text style={{ paddingLeft:5,color:'purple',fontWeight:'500',fontSize:13}}>9:00pm</Text>
            </View>

          </View>
          <View style={styles.middleCol}>
            <Text style={styles.company}>Company name</Text>
            <Text style={styles.service}>
              Hair cut
              <Text style={styles.duration}>(30min)</Text>
            </Text>
            <Text style={styles.employee}>faisal</Text>
            <Text style={styles.price}>29 KD</Text>

          </View>
          <View style={styles.rightCol}>
            <TouchableHighlight onPress={()=>listEmployees()} underlayColor="transparent">
              <View style={styles.employeeSelectWrapper}>
                <View style={{flex:2}}>
                  <Text style={styles.employeeName} >cancel</Text>
                </View>
                <View style={{flex:1}}>
                  <Icon
                    name='ion|close-circled'
                    size={15}
                    color={'white'}
                    style={{width:15,height:15,alignSelf:'flex-end',fontWeight:'300'}}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

ConfirmedAppointmentList.propTypes = {
  //service : PropTypes.object,
  //employees: PropTypes.array,
  //selectedTime:PropTypes.object
};

var styles = StyleSheet.create({
  container: {},
  cellContainer:{
    backgroundColor:'white',
    opacity:0.6,
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    padding:10,
  },
  rightCol:{
    flex:1
  },
  middleCol:{
    flex:1.5,
    paddingRight:10,
    paddingLeft:10,
  },
  leftCol:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  company: {
    fontSize:16,
    color:'#6ed3cf',
    fontWeight:'500'
  },
  service: {
    fontSize:14,
    color:'#9068be',
    fontWeight:'500'
  },
  duration: {
    fontSize:12,
    color:'gray',
    fontWeight:'500'
  },
  employeeName:{
    fontSize:13,
    padding:3,
    fontWeight:'700',
    color:'white'
  },
  price: {
    fontSize:13,
    color:'#b56969',
    fontWeight:'700'
  },
  month: {
    paddingLeft:5,
    fontSize:17,
    fontWeight:'500'
  },
  time: {
    fontSize:11,
    color:'#98dafc'
  },
  day: {
    fontSize:40
  },
  staff:{
    fontSize:12,
    alignSelf:'center',
    color:'gray'
  },
  employeeSelectWrapper: {
    backgroundColor:'red',
    padding:5,
    flexDirection:'row',
    alignItems:'center'
  },

});


