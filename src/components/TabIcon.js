import React, { Component, StyleSheet,Navigator,Text,View,Image} from 'react-native'

import { Icon } from 'react-native-icons';

export default class TabIcon extends Component {
  render() {
    return (
      <View>
        <Icon
          name={this.props.tabIcon}
          size={25}
          color={ this.props.selected ? 'gray' :'#FFFFFF'}
          style={{width:25,height:25,alignSelf:'center'}}
          />
        <Text style={{color: this.props.selected ? 'gray' :'#FFFFFF'}}>{this.props.title}</Text>
      </View>
    );
  }
}