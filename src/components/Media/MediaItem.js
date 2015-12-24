'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView} from 'react-native';

import { Icon } from 'react-native-icons';

export default class MediaItem extends Component {

  renderContent(media) {
    const {caption,url,user} = media;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row",  paddingBottom:10}}>
          <Text style={styles.createdAt}>2h</Text>
          <Text style={styles.name}>{user.name}</Text>
          {user.thumbnail ? <Image style={[styles.thumbnail]} source={{uri:user.thumbnail.name}}/> : <View/> }
        </View>
        <View>
          {url ? <Image style={styles.img} source={{uri:url}}/> : <View/> }
        </View>

        <View>
          <Text style={{ padding:10, textAlign:"center" }}>{caption}</Text>
        </View>
      </View>
    )
  }

  render() {

    const {media} = this.props;

    if (media.id && media.id > 0) {
      return this.renderContent(media);
    }
    return <View/>;
  }

}

var styles = StyleSheet.create({
  container: {},
  img: {
    height: 200,
    borderRadius: 5,
    paddingTop: 10
  },
  commentImg: {
    width: 24,
    height: 22,
    marginRight: 50,
    alignSelf: "center",
  },
  favoriteImg: {
    width: 24,
    height: 22,
    alignSelf: "center"
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  name: {
    color: '#888888',
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    textAlign: 'right',
    paddingRight: 3
  },
  createdAt: {
    flex: 1,
    fontWeight: '200',
    color: '#888888',
    fontSize: 12,
    alignSelf: 'center'
  }

});
