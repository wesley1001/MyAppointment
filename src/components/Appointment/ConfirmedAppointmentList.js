'use strict';
import React, {PropTypes} from 'react';
import { Component, TouchableHighlight, ListView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-icons';
import LoadingIndicator from './../../components/LoadingIndicator';
import Seperator from './../Seperator';
const Actions = require('react-native-router-flux').Actions;

export default class ConfirmedAppointmentList extends Component {

  renderRow(appointment) {
    return (
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
                color={'#999999'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
              />
              <Text style={{ paddingLeft:5,color:'#999999',fontWeight:'500',fontSize:13}}>9:00pm</Text>
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.company}>Company name</Text>
            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:5}}>
              <Icon
                name='ion|location'
                size={15}
                color={'purple'}
                style={{width:15,height:15,alignSelf:'center'}}
              />
              <Text style={styles.location}>Salmiya</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={styles.middleCol}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.service}>
                    Hair cut
                  </Text>
                  <Text style={styles.duration}>(30min)</Text>
                </View>
                <Text style={styles.employee}>with faisal</Text>
              </View>

              <View style={styles.cancelWrapper}>
                <TouchableHighlight onPress={()=>listEmployees()} underlayColor="transparent">

                  <View >
                    <Text style={styles.price}>29 KD</Text>
                    <View style={styles.employeeSelectWrapper}>
                      <View style={{flex:2}}>
                        <Text style={styles.employeeName} >cancel</Text>
                      </View>
                      <View style={{flex:1}}>
                        <Icon
                          name='ion|close-circled'
                          size={15}
                          color={'white'}
                          style={{width:15,height:15,fontWeight:'300'}}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    );

  }

  render() {
    const {appointments} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = appointments ? ds.cloneWithRows(appointments) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        contentInset={{bottom:49}}
        style={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
        ref='listView'
      />
    )
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
    flex:2,
  },
  cancelWrapper:{
    flex:1,
    alignSelf:'center'
  },
  middleCol:{
    flex:1.5,
  },
  leftCol:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  company: {
    fontSize:16,
    color:'#300032',
    fontWeight:'500',
    paddingBottom:5
  },
  location: {
    color:'purple',
    fontWeight:'500',
    fontSize:13,
  },
  service: {
    fontSize:16,
    color:'#6ed3cf',
    fontWeight:'500',
    paddingBottom:5
  },
  duration: {
    fontSize:10,
    color:'#06000a',
    fontWeight:'500',
    paddingLeft:5
  },
  employee:{
    fontSize:13,
    fontWeight:'700',
    color:'#c43235'
  },
  price: {
    fontSize:20,
    color:'#677077',
    fontWeight:'700',
    textAlign:'center',
    paddingBottom:5
  },
  month: {
    paddingLeft:5,
    fontSize:17,
    fontWeight:'500',
    color:'gray'
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
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row',
    alignItems:'center'
  },
  employeeName:{
    fontSize:13,
    paddingTop:3,
    paddingBottom:3,
    fontWeight:'700',
    color:'white',
    textAlign:'center'
  },

});
