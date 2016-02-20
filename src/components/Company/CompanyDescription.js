'use strict';
import React from 'react';

import { Component,StyleSheet,View,Text } from 'react-native';

export default class CompanyDescription extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.company.description_en}
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