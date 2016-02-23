'use strict';
import React, {PropTypes} from 'react';
import { Component, TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-icons';
import LoadingIndicator from './../../components/LoadingIndicator';
import Seperator from './../Seperator';
const Actions = require('react-native-router-flux').Actions;

export default class AppointmentList extends Component {

  logout = () => {};

  render() {
    const {company,selectedTime,date} = this.props;
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={() => ''} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.leftCol}>
              <Icon
                name='ion|person'
                size={40}
                color={'white'}
                style={{width:40,height:40,alignSelf:'center',fontWeight:100}}
              />
            </View>
            <View style={styles.middleCol}>
              <Text style={styles.serviceName}>{company.service.name_en}</Text>
              <View style={styles.employeeSelectWrapper}>
                <Text style={styles.employeeName} onPress={()=>this.props.listEmployees()}>{this.props.selectedEmployee}</Text>
                <Icon
                  name='ion|chevron-right'
                  size={10}
                  color={'black'}
                  style={{width:10,height:10,alignSelf:'center',fontWeight:300}}
                />
              </View>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.price}>{company.service.pivot.price|0} KD</Text>
              <Text style={styles.date}>{date.toISOString().slice(0, 10)}</Text>
              <Text style={styles.time}>{selectedTime.time_en} ({company.service.pivot.duration_en})</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separatorWrapper}>
          <View style={{flex:1}}/>
          <View style={styles.separator} />
        </View>
      </View>
    );
  }
}

AppointmentList.propTypes = {
  service : PropTypes.object,
  employees: PropTypes.array
};

var styles = StyleSheet.create({
  container: {},
  cellContainer:{
    marginTop:20,
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    padding:10,
  },
  rightCol:{
    flex:1.5,
  },
  middleCol:{
    flex:2,
    paddingRight:10,
    paddingLeft:10,
  },
  leftCol:{
    flex:1,
    backgroundColor:'#e7e7e7',
    height:60,
    width:50,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  separatorWrapper:{
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  separator: {
    height:0.5,
    backgroundColor:'#f0f5f5',
    flex:4
  },
  serviceName: {
    fontSize:12,
    color:'#239077'
  },
  employeeSelectWrapper: {
    backgroundColor:'#99ddff',
    padding:5,
    marginTop:10,
    flexDirection:'row',
  },
  employeeName:{
    fontSize:12,
    padding:3,
    color:'white'
  },
  price:{
    fontSize:11,
    color:'#084033'

  },
  time:{
    fontSize:11,
    color:'#084033'

  },
  date:{
    fontSize:11,
    color:'#084033'

  }


});


