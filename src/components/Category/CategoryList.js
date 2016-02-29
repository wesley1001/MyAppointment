'use strict';

import React, { PropTypes } from 'react';
import { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';

export default class CategoryList extends Component {
  //

  renderRow(category) {
    return (
      <TouchableHighlight onPress={() => this.props.loadCategory(category)} underlayColor="transparent">
        <View >
          <View style={styles.row}>
            <Image style={styles.thumbnail} source={{uri:category.image}} resizeModel={'contain'}/>
            <Text style={styles.text}> {category.name_en}</Text>
          </View>
        </View>
      </TouchableHighlight>
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

CategoryList.propTypes = ({
  companies : PropTypes.array.isRequired
});

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'column',
    marginTop:30
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    marginBottom:40,
    width: 100,
    height: 100,
    borderRadius:50,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginBottom: 5,
    paddingTop:5,
    alignSelf:'center',
    color:'black',
    fontSize:16,
    fontWeight:'800',
    fontFamily:'menlo'
  },

});
