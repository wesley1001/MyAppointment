'use strict';

import React, { Component,ListView,TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import LoadingIndicator from './../components/LoadingIndicator';

export default class TimingList extends Component {

  renderRow(timing) {
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={()=>this.props.makeAppointment(timing)} underlayColor='transparent'>

          <View style={styles.cellWrapper}>

            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {timing.time}
              </Text>
            </View>

          </View>

        </TouchableHighlight>

        <View style={styles.separator}/>

      </View>
    )

  }

  render() {

    const {timings} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = timings ? ds.cloneWithRows(timings) : ds.cloneWithRows([]);

    return (

      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
      />
    );

  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',

  },
  cellContainer:{
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    marginTop:10,
    marginBottom:10,
    alignItems:'center',
    paddingRight:5,
    paddingLeft:5
  },
  titleWrapper: {
    justifyContent:'flex-start',
    flex:2,
  },
  priceWrapper:{
    justifyContent:'flex-end',
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  name: {
    color: '#DA552F',
    fontSize:15
  },
  price: {
    textAlign:'right',
    color:'gray',
    fontSize:13
  },
  bookButtonWrapper:{
    flexDirection:'row',
    marginLeft:10,
    backgroundColor:' #00b377',
    justifyContent:'center',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:2
  },
  bookButton: {
    color:'white',
    textAlign:'right',
    fontSize:12,
    alignSelf:'center',
    paddingLeft:3
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8'
  },
  calendarIcon :{
    height:20,
    width:20
  }

});
