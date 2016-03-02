import React, { PropTypes } from 'react';
import { Component, StyleSheet,Navigator,Text,View,Image} from 'react-native'
import { Icon } from 'react-native-icons';

export default class TabIcon extends Component {
  render() {
    return (
      <View>
        <Icon
          name={this.props.selected ? this.props.selectedTabIcon : this.props.tabIcon }
          size={25}
          color={ this.props.selected ? '#66b2ff' :'#FFFFFF'}
          style={{width:25,height:25,alignSelf:'center',fontWeight:'700'}}
        />
      </View>
    );
  }
}

TabIcon.propTypes = {
  selected:PropTypes.string,
  selectedTabIcon:PropTypes.string.isRequired,
  tabIcon:PropTypes.string.isRequired
}