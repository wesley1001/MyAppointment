'use strict';
import React, {PropTypes}  from 'react';
import { Component, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategory } from './../../actions/Category/category';
import { favoriteCompany,unFavoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategory(this.props.categoryProp.id));
  }

  //componentWillUpdate(nextProps,nextState) {
  // return nextProps.companies !== this.props.companies ;
  //}

  loadCompany(company) {
    Actions.companyEntity({
      title:company.name,
      id: company.id
    });
  }

  favoriteCompany(company) {

    if(!this.props.user.isAuthenticated) {
      Actions.loginDialog({dialogText:'Please login to add to favorites'});
    } else {
      const {dispatch} = this.props;
      if(company.isFavorited) {
        dispatch(unFavoriteCompany(company));
        //dispatch(unFavoriteCompany(company)).then(()=> {
          //dispatch(fetchCategory(this.props.id))
        //});
        //@todo:: normalize the reducers
      } else {
        dispatch(favoriteCompany(company));
        //dispatch(favoriteCompany(company)).then(()=>{
          //dispatch(fetchCategory(this.props.id))
        //});
      }
    }

  }

  render() {
    const {categoryProp,categoryReducer,companies,categories} = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,paddingTop: 10}}>
        {categoryReducer.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
          companies={categories[categoryProp.id].companies ? categories[categoryProp.id].companies.map((i) => companies[i]) : []}
        />
      </Image>
    );
  }
}


Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categoryProp:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { entities,categoryReducer } = state;
  return {
    categoryReducer,
    categories:entities.categories,
    companies:entities.companies
  }
}

export default connect(mapStateToProps)(Category);
