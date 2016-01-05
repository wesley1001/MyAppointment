'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView} from 'react-native';

import { Icon } from 'react-native-icons';

export default class CompanyItem extends Component {

  renderContent(company) {
    return (
      <Image source={{uri:company.thumbnail.name}} style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.name}>{company.name}</Text>
        </View>
      </Image>
    )
  }

  render() {
    const {company} = this.props;
    if (company.id && company.id > 0) {
      return this.renderContent(company);
    }
    return <View/>;
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: 200,
    opacity:.8,
    justifyContent:'flex-end'
  },
  textView:{
    backgroundColor: 'black',
    opacity: 0.8,
    height:50,
    justifyContent:'center',
    alignItems:'center'
  },
  name: {
    color:'#FFFFFF',
    fontSize:26,
    fontWeight:'600',
    alignSelf:'center'
  }

});
