'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux/native';
import {fetchMedias} from './../actions/medias';
import MediaList from './../components/Media/MediaList';
import LoadingIndicator from './../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Medias extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchMedias());
  }

  loadMedia(media) {
    Actions.mediaEntityTab({
      data: media
    });
  }

  render() {

    const {  medias } = this.props;

    if (medias.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <MediaList medias={medias.collection} loadMedia={this.loadMedia}/>
    );

  }
}

function mapStateToProps(state) {
  const { medias } = state
  return {
    ...state,
    medias: medias,
  }
}

export default connect(mapStateToProps)(Medias)
