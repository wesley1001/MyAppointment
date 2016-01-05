'use strict';
import React from 'react-native';

const {
  Component,
  StyleSheet,
  View,
  Text
  } = React;

export default class CompanyDescription extends Component {


  render() {
    return (
        <View style={styles.container}>

          <Text>
            {this.props.company.description}
          </Text>

        </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5
  }
});