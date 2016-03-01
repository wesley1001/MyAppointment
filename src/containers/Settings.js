'use strict';

import React, { Component,ListView,ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import LoadingIndicator from './../components/LoadingIndicator';
import { Icon } from 'react-native-icons';
import { logoutUser } from './../actions/Auth/login';
const Actions = require('react-native-router-flux').Actions;
import { connect } from 'react-redux';

class Settings extends Component {


  performLogout() {
    this.props.dispatch(logoutUser());
    Actions.home();
  }
  // fetch timings
  //@todo: perform logout
  logout = () => {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
  };

  render() {

    return (

      <ScrollView contentContainerStyle={styles.container}>
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
                <Text>Profile</Text>
              </View>
              <View style={styles.rightCol}>
                <Icon
                  name='ion|chevron-right'
                  size={20}
                  color={'#f0f5f5'}
                  style={{width:20,height:20,alignSelf:'flex-end',fontWeight:'200'}}
                />
              </View>
            </View>
          </TouchableHighlight>

          <View style={styles.separatorWrapper}>
            <View style={{flex:1}}/>
            <View style={styles.separator} />
          </View>

          <TouchableHighlight onPress={() => this.logout()} underlayColor='transparent'>
            <View style={styles.cellWrapper}>
              <View style={styles.leftCol}>
                <Icon
                  name='ion|power'
                  size={20}
                  color={'red'}
                  style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
                />
              </View>
              <View style={styles.middleCol}>
                <Text>Logout</Text>
              </View>
              <View style={styles.rightCol}>
                <Icon
                  name='ion|chevron-right'
                  size={20}
                  color={'#f0f5f5'}
                  style={{width:20,height:20,alignSelf:'flex-end',fontWeight:'200'}}
                />
              </View>
            </View>
          </TouchableHighlight>

          <View style={styles.separatorWrapper}>
            <View style={{flex:1}}/>
            <View style={styles.separator} />
          </View>

        </View>
      </ScrollView>

    );

  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f5f5',
    paddingTop:64
  },
  cellContainer:{
    marginTop:20,
    backgroundColor:'white',
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'white',
    padding:10,
    borderColor:'white',
    borderBottomColor:'white'
  },
  rightCol:{
    flex:1,
  },
  middleCol:{
    flex:3,
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
    backgroundColor: 'white',
  },
  separator: {
    height:0.5,
    backgroundColor:'#f0f5f5',
    flex:4
  }


});

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Settings);
