'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { Icon } from 'react-native-icons';

export default class ServiceList extends Component {

  renderRow(service) {
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={() => ''} underlayColor='transparent'>

          <View style={styles.cellWrapper}>

            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {service.name}
              </Text>
            </View>

            <View style={styles.priceWrapper}>
              <Text style={styles.price}>
                {service.price ? service.price : '30'} KD
              </Text>

              <TouchableHighlight onPress={() => this.props.loadService(service)} underlayColor='transparent'>
                <View style={styles.bookButtonWrapper} >

                  <Icon
                    name='ion|calendar'
                    size={20}
                    color='#887700'
                    style={styles.calendarIcon}
                  />
                  <Text style={styles.bookButton}>
                    Book
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

        </TouchableHighlight>

        <View style={styles.separator}/>

      </View>
    )
  }

  render() {
    const {services} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = services ? ds.cloneWithRows(services) : ds.cloneWithRows([]);

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
      />
    )

  }



}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    margin:10
  },
  cellContainer:{
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    marginTop:10,
    marginBottom:10,
    alignItems:'center'
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
    fontSize:20
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
