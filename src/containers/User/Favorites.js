'use strict';
import React from 'react';
import { Component, ScrollView, Image, View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchFavorites } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Favorites extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(this.props.auth) {
      if(!this.props.user.isAuthenticated) {
        Actions.loginDialog({
          dialogText:'Please Login to view and manage your Favorites'
        });
      } else {
        console.log('fetch fav');
        const {dispatch} = this.props;
        dispatch(fetchFavorites());
      }
    }

  }

  render() {
    console.log('render fav');

    const { user } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,flexWrap:'wrap'}}>
        {user.favorites.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList companies={user.favorites.collection} loadCompany={()=>''}/>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    user:state.user
  }
}

export default connect(mapStateToProps)(Favorites);