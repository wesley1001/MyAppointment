'use strict';

import React, { Component } from 'react-native';
import {connect} from 'react-redux/native';
import MediaList from './../components/Media/MediaList';
import LoadingIndicator from './../components/LoadingIndicator';
import { fetchFavorites } from './../actions/favorites';
const Actions = require('react-native-router-flux').Actions;

class Favorites extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch,user} = this.props;
    user.id = 1; // @todo..  remove this in prod
    dispatch(fetchFavorites(user.id));
  }

  loadMedia(media) {
    Actions.mediaEntityTab({
      data: media
    });
  }

  render() {

    const { favorites } = this.props;

    //console.log('favorites ', JSON.stringify(favorites));

    if (favorites.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <MediaList medias={favorites.collection} loadMedia={this.loadMedia}/>
    );

  }
}

function mapStateToProps(state) {
  const { favorites,user } = state

  return {
    ...state,
    favorites,
    user,
  }
}

export default connect(mapStateToProps)(Favorites)
