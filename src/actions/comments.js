import {API_ROOT} from './../utils/config'
import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENT_SAVED,
  SAVING_COMMENT
} from '../constants/ActionTypes'

function commentsRequest() {
  return {
    type: COMMENTS_REQUEST,
  }
}

function commentsSuccess(payload) {
  return {
    type: COMMENTS_SUCCESS,
    collection: payload.data
  }
}

function commentsFailure(error) {
  return {
    type: COMMENTS_FAILURE,
    error: error,
  }
}

function savingCommment() {
  return {
    type: SAVING_COMMENT
  }
}

function commentSaved(payload) {
  return {
    type: COMMENT_SAVED,
    comment: payload.comment
  }
}

export function fetchComments(mediaID) {
  return (dispatch) => {
    dispatch(commentsRequest());
    return fetch(API_ROOT + '/medias/' + mediaID + '/comments')
      .then(response => response.json())
      .then(json => {
        dispatch(commentsSuccess(json));
      })
      .catch((err)=> {
        dispatch(commentsFailure(err));
      })
  }
}

export function addComment(inputs) {
  return (dispatch) => {
    dispatch(savingCommment());
    return fetch(API_ROOT + '/medias/comment', {
      method: 'POST',
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(commentSaved(json));
        dispatch(fetchComments(inputs.media));
      })
      .catch((err)=> {
      })
  }
}