import React, { Component,StyleSheet,ActivityIndicatorIOS,View} from 'react-native'

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={[{flex: 1, justifyContent: 'center',alignItems: 'center'},this.props.style]}>
        <ActivityIndicatorIOS size="large" animating={true}/>
      </View>
    );
  }
}