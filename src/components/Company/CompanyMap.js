'use strict';
import React, { PropTypes } from 'react';
import { Component,StyleSheet,MapView } from 'react-native';

export default class CompanyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pin: this.props.pin,
      region: this.getFitZoomMapRegionWithCoords(this.props.pin)
    }
  }

  getFitZoomMapRegionWithCoords(region) {

    var topLeftLatitude = -90;
    var topLeftLongitude = 180;
    var bottomRightLatitude = 90;
    var bottomRightLongitude = -180;

    topLeftLongitude = Math.min(topLeftLongitude, parseFloat(region.longitude));
    topLeftLatitude = Math.max(topLeftLatitude, parseFloat(region.latitude));
    bottomRightLongitude = Math.max(bottomRightLongitude, parseFloat(region.longitude));
    bottomRightLatitude = Math.min(bottomRightLatitude, parseFloat(region.latitude));

    var fitLatitude = topLeftLatitude - (topLeftLatitude - bottomRightLatitude) * 0.5;
    var fitLongitude = topLeftLongitude + (bottomRightLongitude - topLeftLongitude) * 0.5;
    var fitSpanLatDelta = Math.abs(topLeftLatitude - bottomRightLatitude) * 1.1;
    var fitSpanLongDelta = Math.abs(bottomRightLongitude - topLeftLongitude) * 1.1;
    if (fitSpanLatDelta == 0 && fitSpanLongDelta == 0) {
      fitSpanLatDelta = fitSpanLongDelta = 0.08;
    }
    var fitRegion = {
      latitude : fitLatitude,
      longitude : fitLongitude,
      latitudeDelta : fitSpanLatDelta,
      longitudeDelta : fitSpanLongDelta
    };

    return fitRegion;
  };

  render() {
    return (
        <MapView
          style={styles.mapContainer}
          annotations={[this.props.pin]}
          region={this.state.region}
        />
    );
  }
}

CompanyMap.propTypes = {
  pin:PropTypes.object.isRequired
};

let styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop:10,
    height: 250
  }
});