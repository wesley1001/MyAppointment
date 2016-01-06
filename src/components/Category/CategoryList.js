'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class CategoryList extends Component {
  //

  renderRow(category) {
    return (

      <View style={styles.row}>
        <TouchableHighlight onPress={() => this.props.loadCategory(category)} underlayColor="transparent">
          <View>
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
        automaticallyAdjustContentInsets={false}
        ref='listView'
        />
    )

  }
}

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    marginBottom:40,
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  thumbnail: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  text: {
    marginBottom: 5,
    paddingTop:5,
    alignSelf:'center',
    color:'#5BC3BE',
    fontSize:18
  },
});
