'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView, ScrollView } from 'react-native';

export default class CommentList extends Component {

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(comment) {
    return (
      <View>
        <TouchableHighlight onPress={() => ''} underlayColor="transparent">
          <View style={{flexDirection:"row", justifyContent:"flex-end", padding:5}}>
            <View style={[{flexDirection:"column",paddingRight:10}]}>
              <Text style={[{color:'#D49393', fontSize:14},styles.rtl]}>{comment.user.name}</Text>
              <Text style={styles.rtl}>{comment.comment}</Text>
            </View>
            {comment.user.thumbnail ? <Image style={styles.thumb} source={{uri:comment.user.thumbnail.name}}/> :
              <View/>}

          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const {comments} = this.props;

    if (comments.length && comments.length > 0) {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
      let dataSource = comments ? ds.cloneWithRows(comments) : ds.cloneWithRows([]);

      return (
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:this.props.contentInset ? this.props.contentInset : 49 }}
          />
      )
    }
    return <View />;
  }
}

var styles = StyleSheet.create({
  list: {},
  row: {
    justifyContent: 'flex-end',
    padding: 5,
    margin: 3,
  },
  thumb: {
    width: 48,
    height: 44,
    borderRadius: 24,
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
  },
  rtl: {
    textAlign: 'right'
  }
});
