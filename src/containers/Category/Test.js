'use strict';
import React, { PropTypes } from 'react';
import { Component, View, Image, ScrollView } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchCategories } from './../../actions/Category/categories';
import { assets } from './../../utils/assets';
import CategoryList from './../../components/Category/CategoryList';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;
import {Record} from 'immutable';

class Test extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const { categories } = this.props;
    return (
      <View/>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Test);
