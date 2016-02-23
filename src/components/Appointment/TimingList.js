'use strict';
import React from 'react';
import { Component,ListView,TouchableHighlight,StyleSheet,Text,View,AlertIOS } from 'react-native';
import LoadingIndicator from './../LoadingIndicator';
import Seperator from './../Seperator';

export default class TimingList extends Component {

  renderRow(time) {
    return (
      <View style={[styles.cellContainer,this.props.selectedTime.id == time.id ? styles.activeCell:'']} key={time.id} >
        <TouchableHighlight onPress={()=>this.props.onTimeSelect(time)} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {time.time_en}
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
    let dataSource = timings.collection ? ds.cloneWithRows(timings.collection) : ds.cloneWithRows([]);
    return (
      <View >
        <Seperator />
        <View style={styles.timingHeading}>
          <Text style={styles.timingLabel}>choose time on {this.props.date.toISOString().slice(0, 10)} </Text>
        </View>
        <Seperator />
        {timings.isFetching ? <LoadingIndicator style={{marginTop:10}}/> : <View/>}
        <ListView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          dataSource={dataSource}
          renderRow={(rowData, sec, i) => this.renderRow.bind(this)}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          style={styles.container}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',

  },
  cellContainer:{
    margin:5,
    backgroundColor:'#e7e7e7'
  },
  activeCell : {
    backgroundColor:'#99ddff'
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
    color: 'white',
    fontSize:14
  },
  price: {
    textAlign:'right',
    color:'gray',
    fontSize:13
  },
  bookButtonWrapper:{
    flexDirection:'row',
    marginLeft:10,
    justifyContent:'center',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:2,
    backgroundColor:'blue',

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
  },
  timingHeading: {
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10
  },
  timingLabel:{
    fontSize:15,
    color:'purple'
  },


});
