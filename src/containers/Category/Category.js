'use strict';
import React, {PropTypes}  from 'react';
import { Component, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategory } from './../../actions/Category/category';
import { favoriteCompany } from './../../actions/favorites';
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
    dispatch(fetchCategory(this.props.id));
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
    const {category} = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,paddingTop: 10}}>
        {category.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
          companies={category.entity.companies}
        />
      </Image>
    );
  }
}


Category.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    ...state,
    category: state.category
  }
}

export default connect(mapStateToProps)(Category);
