'use strict';

import React,{AsyncStorage} from 'react-native';
import Router from './../utils/Router.js';
import Service from  './Service';
import Thumbnail from  './Thumbnail';
import {API_URL,COMPANY_STORAGE_KEY} from './../utils/config.js';

const {
  Text,
  View,
  Component,
  StyleSheet,
  MapView
  } = React;

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

CompanyMap.propTypes = {};

let styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  }
});