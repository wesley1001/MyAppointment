import React, { PropTypes } from 'react-native';
import { Component,StyleSheet,View,Text,Dimensions,TouchableOpacity } from 'react-native';
import { connect } from './../../../node_modules/react-redux';
import { fetchCompanyMarkers } from './../../actions/Company/companies';
import CompanyMapsMarker from './../../components/Company/CompanyMapsMarker';

class Map extends  Component {

  constructor(props) {

    super(props);

    const LATITUDE_DELTA = 1.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (Dimensions.get('window').width / Dimensions.get('window').height);

    this.state = {
      region: {
        latitude: 29.3667,
        longitude: 47.9667,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCompanyMarkers());
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <CompanyMapsMarker
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    company: state.company
  }
}

export default connect(mapStateToProps)(Map);
