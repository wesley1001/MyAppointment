'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class CategoryList extends Component {

  renderRow(category) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.loadCategory(category)} underlayColor="transparent">
          <View style={{flexDirection:'row'}}>
            <Image style={styles.thumbnail} source={{uri:category.thumbnail.name}}/>
            <Text style={styles.text}> {category.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const {categories} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = categories ? ds.cloneWithRows(categories) : ds.cloneWithRows([]);

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
    backgroundColor:'white',
    opacity:0.5,
  },

  text: {
    color: 'black',
    fontSize: 40,
    alignSelf:'center'
  },

  thumbnail: {
    width: 80,
    height: 80,
    borderRadius:40
  },

});
