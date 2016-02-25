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
    const {dispatch} = this.props;
    dispatch(fetchFavorites());
  }

  render() {

    const { user } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10}}>
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
