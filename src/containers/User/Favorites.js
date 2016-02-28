'use strict';
import React from 'react';
import { Component, ScrollView, Image, View } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchFavorites,favoriteCompany } from './../../actions/favorites';
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

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      id: company.id
    });
  }

  favoriteCompany(company) {
    const {dispatch} = this.props;
    dispatch(favoriteCompany(company));
  }

  render() {
    const { user } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,flexWrap:'wrap'}}>
        {user.favorites.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList
          companies={user.favorites.collection}
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
        />
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
