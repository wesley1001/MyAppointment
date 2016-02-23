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
    const {company,time,date} = this.props;
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={() => ''} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.leftCol}>
              <Icon
                name='ion|person'
                size={20}
                color={'gold'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
              />
            </View>
            <View style={styles.middleCol}>
              <Text>{company.service.name_en}</Text>
              <Text onPress={()=>this.props.listEmployees()}>{this.props.selectedEmployee}</Text>
            </View>
            <View style={styles.rightCol}>
              <Text>{company.service.pivot.price|0} KD</Text>
              <Text>{time.time_en} ({company.service.pivot.duration_en})</Text>
              <Text>{date.toISOString().slice(0, 10)}</Text>
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
    flex:2,
  },
  middleCol:{
    flex:1,
    paddingRight:10,
    paddingLeft:10,
  },
  leftCol:{
    flex:1,
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
  }

});


