'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class CompanyList extends Component {

  renderRow(company) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.loadCompany(company)} underlayColor="transparent">
          <View style={{flexDirection:'row'}}>
            <Image style={styles.thumbnail} source={{uri:company.thumbnail.name}}/>
            <View style={{flexDirection:'column'}} >
              <Text style={styles.name}> {company.name}</Text>
              <Text style={styles.description}> {company.name}</Text>
              <Text style={styles.mobile}> {company.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const {companies} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = companies ? ds.cloneWithRows(companies) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.list}
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

var styles = StyleSheet.create({

  container: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 3,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    opacity: 0.5,
  },

  name: {
    color: 'black',
    fontSize: 40
  },

  description: {
    color: 'black',
    fontSize: 13,
    paddingLeft:5
  },

  mobile: {
    color:'black',
    paddingLeft:5
  },

  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40
  },

});