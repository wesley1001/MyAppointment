'use strict';
import React from 'react';
import { Component, ScrollView, Image, View,RefreshControl } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchFavorites,favoriteCompany,unFavoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state={
      isRefreshing:false
    }
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    if(!this.props.userReducer.isAuthenticated) {
      //setTimeout(() => Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'}), 0);
      Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'})
    } else {
      this.props.dispatch(fetchFavorites());
    }
  }

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      id: company.id
    });
  }

  unFavoriteCompany(company) {
    const {dispatch} = this.props;
    dispatch(unFavoriteCompany(company));
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.dispatch(fetchFavorites())
      .then((val)=>this.setState({isRefreshing: false}));
  }

  render() {
    const { userReducer,favorites } = this.props;

    return (

      <Image source={assets.nail} style={{flex: 1,width: null,height: null,paddingTop: 10}}>
        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="white"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
        >
          {userReducer.favorites.isFetching ? <LoadingIndicator /> : <View />}
          <CompanyList
            companies={favorites}
            loadCompany={this.loadCompany.bind(this)}
            favoriteCompany={this.unFavoriteCompany.bind(this)}
          />
        </ScrollView>

      </Image>
    );
  }
}

function mapStateToProps(state) {
  const {entities } = state;
  let userID = state.userReducer.authUserID;
  return {
    userReducer:state.userReducer,
    favorites: entities.users[userID] ?
      (entities.users[userID].favorites  ? entities.users[userID].favorites.map((company) => entities.companies[company] ) :[] ) : [],
  }
}

export default connect(mapStateToProps)(Favorites);
