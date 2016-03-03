'use strict';
import React, { PropTypes } from 'react';
import { Component,StyleSheet,View,Text,Dimensions,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

export default class CompanyMapsMarker extends Component {

  render() {
    const {companies} = this.props || [];
    //overlays={[{
    //  coordinates:[
    //    {latitude: 32.47, longitude: -107.85},
    //    {latitude: 45.13, longitude: -94.48},
    //    {latitude: 39.27, longitude: -83.25},
    //    {latitude: 32.47, longitude: -107.85},
    //  ],
    //  strokeColor: '#f007',
    //  lineWidth: 3,
    //}]}
    return (

      <MapView
        ref="map"
        style={styles.map}
        region={this.props.region}
        //onRegionChange={()=>this.props.onRegionChange()}
      >
        {companies.collection.map((company)=>{
          return (
            <MapView.Marker
              ref={"ref"+company.id}
              key={"key"+company.id}
              coordinate={{latitude:parseFloat(company.latitude),longitude:parseFloat(company.longitude)}}
            >
              <MapView.Callout>
                <View style={styles.container}>
                  <Text>{company.name_en}</Text>
                  <TouchableOpacity underlayColor="transparent" onPress={()=>this.props.followLocation(company)}>
                    <Text style={styles.getDirectionText}>
                      Click here to get direction (google maps)
                    </Text>
                  </TouchableOpacity>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
    );
  }
}

CompanyMapsMarker.propTypes = {
  region:PropTypes.object.isRequired,
  onRegionChange:PropTypes.func.isRequired,
  followLocation:PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  getDirectionText:{
    textDecorationLine:'underline',
    paddingTop:20
  }
});
