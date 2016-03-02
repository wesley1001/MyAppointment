'use strict';
import React, { PropTypes } from 'react';
import { Component,StyleSheet,View,Text,Dimensions,TouchableOpacity,MapView } from 'react-native';

export default class CompanyMapsMarker extends Component {

  render() {
    return (
      <MapView
        ref="map"
        style={styles.map}
        region={this.props.region}
        onRegionChange={()=>this.props.onRegionChange(this.props.region)}
      >

      </MapView>
    );
  }
}

CompanyMapsMarker.propTypes = {
  region:PropTypes.object.isRequired,
  onRegionChange:PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
