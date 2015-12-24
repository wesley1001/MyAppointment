'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView,ScrollView } from 'react-native';
import {connect} from 'react-redux/native';
import {fetchMedia,favoriteMedia} from './../actions/media';
import MediaItem from './../components/Media/MediaItem';
import MediaCommentIcon from './../components/Media/MediaCommentIcon';
import MediaFavoriteIcon from './../components/Media/MediaFavoriteIcon';
import CommentList from './../components/Comment/CommentList';
import LoadingIndicator from './../components/LoadingIndicator';
import {assets} from '../utils/assets'
import { Icon } from 'react-native-icons';
const Actions = require('react-native-router-flux').Actions;

class Media extends Component {

  constructor(props) {
    super(props);
    this.handleFavoriteIconPress = this.handleFavoriteIconPress.bind(this);
    this.handleCommentIconClick = this.handleCommentIconClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchMedia(this.props.data.id));
  }

  handleCommentSubmit = (comment) => {
    const {dispatch} = this.props;
    const params = {
      media: media.id,
      comment: comment,
    }
    dispatch(commentMedia(params));
  }

  handleCommentIconClick = () => {
    const {media} = this.props;

    Actions.mediaCommentsTab({
      data: media
    });

  }

  handleFavoriteIconPress = () => {
    //console.log('fav button pressed');
    const {dispatch,user,media} = this.props;

    user.id = 1; // for testing purpose only.. uncomment while in production

    const params = {
      user: user.id,
      media: media.entity.id
    };

    dispatch(favoriteMedia(params));
  }


  render() {

    const {media} = this.props;

    if (media.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView style={styles.container}>
        <MediaItem media={media.entity}/>
        <View style={styles.buttonWrapper}>
          <MediaCommentIcon onCommentIconClick={this.handleCommentIconClick}/>
          <MediaFavoriteIcon hasFavorited={media.hasFavorited} onFavoriteIconPress={this.handleFavoriteIconPress}/>
        </View>
        <CommentList comments={media.comments} line={assets.line} contentInset={0}/>
      </ScrollView>
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    paddingTop: 64,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  const { media } = state
  return {
    ...state,
    media: media,
  }
}

export default connect(mapStateToProps)(Media)
