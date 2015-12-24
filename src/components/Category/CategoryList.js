'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class CategoryList extends Component {

  renderRow(category) {
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={() => this.props.loadCategory(category)} underlayColor="transparent">
          <Image style={styles.thumbnail} source={{uri:category.thumbnail.name}}/>
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
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical:20
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});
