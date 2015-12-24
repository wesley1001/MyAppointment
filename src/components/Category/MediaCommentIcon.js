'use strict';

import React, { Component, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-icons';

export default class MediaCommentIcon extends Component {

  handleCommentIconPress() {
    const {onCommentIconClick} = this.props;
    onCommentIconClick();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'row',justifyContent:'center'}}>
        <Text style={{alignSelf:'center'}}>100</Text>
        <TouchableHighlight onPress={() => this.props.onCommentIconClick()} underlayColor="transparent">
          <Icon
            name='ion|ios-chatbubble-outline'
            size={26}
            color={'black'}
            style={styles.commentImg}
            />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentImg: {
    width: 24,
    height: 22
  }
});
