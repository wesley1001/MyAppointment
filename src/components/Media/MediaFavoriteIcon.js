'use strict';

import React, { Component, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-icons';

export default class MediaFavoriteIcon extends Component {

  render() {
    return (
      <View style={{flex:1, flexDirection:'row',justifyContent:'center'}}>
        <Text style={{alignSelf:'center'}}>20</Text>
        <TouchableHighlight onPress={() => this.props.onFavoriteIconPress()} underlayColor="transparent">
          <Icon
            name='ion|android-favorite-outline'
            size={24}
            color={ this.props.hasFavorited ? 'red' :'black'}
            style={styles.favoriteImg}
            />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoriteImg: {
    width: 24,
    height: 22
  }
});
