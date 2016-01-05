'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class ServiceList extends Component {


  handleAppointment(service) {
    return this.props.confirmAppointment(service);
  }

  handleServiceRoute(service) {
    return this.props.loadService(service);
  }

  renderRow(service) {
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={this.handleServiceRoute.bind(this)} underlayColor='transparent'>

          <View style={styles.cellWrapper}>

            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {service.name}
              </Text>
            </View>

            <View style={styles.priceWrapper}>
              <Text style={styles.price}>
                50 KD
              </Text>

              <TouchableHighlight onPress={this.handleAppointment.bind(this)} underlayColor='transparent'>
                <View style={styles.bookButtonWrapper} >

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
    flex:1,
  },
  priceWrapper:{
    justifyContent:'flex-end',
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  title: {
    color: '#DA552F',
  },
  price: {
    textAlign:'right'
  },
  bookButtonWrapper:{
    marginLeft:10,
    backgroundColor:'yellow',
    justifyContent:'center',
    padding:4,
    paddingLeft:10,
    paddingRight:10
  },
  bookButton: {
    color:'black',
    textAlign:'right',
    fontSize:12
  },
  separator: {
    height:0.5,
    backgroundColor:'#E8E8E8'
  }

});
