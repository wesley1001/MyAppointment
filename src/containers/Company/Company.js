'use strict';
import React, { PropTypes } from 'react';
import { Component, View, ScrollView, SegmentedControlIOS } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { fetchCompany,setCompanyService } from './../../actions/Company/company';
import CompanyItem from './../../components/Company/CompanyItem';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
import CompanyMap from './../../components/Company/CompanyMap';
import CompanyDescription from './../../components/Company/CompanyDescription';
const Actions = require('react-native-router-flux').Actions;

class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex : 0
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCompany(this.props.companyProp.id));
  }

  loadDateTime(service) {
    const {dispatch} = this.props;
    dispatch(setCompanyService(service));
    Actions.appointmentContainer({
      title:service.name,
      serviceProp:service,
      companyProp:this.props.companyProp
    });
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }


  render() {
    const {companyReducer,company, services } = this.props;

    if(companyReducer.isFetching) {
      return ( <LoadingIndicator />);
    }  else {
      let mapPin = {
        title:company.name,
        subtitle:company.location,
        latitude:parseFloat(company.latitude),
        longitude:parseFloat(company.longitude)
      };

      let selectedComponent;

      if(this.state.selectedIndex === 1) {
        selectedComponent = <CompanyDescription company={company} />
      } else if(this.state.selectedIndex === 2) {
        selectedComponent = <CompanyMap pin={mapPin} />
      } else {
        selectedComponent = <ServiceList company={company} services={services} loadDateTime={this.loadDateTime.bind(this)} />
      }

      return (
        <ScrollView contentContainerStyle={{paddingTop: 64}}>
          <CompanyItem company={company}/>
          <View style={{margin:5,marginTop:20}}>
            <SegmentedControlIOS values={['Services', 'Description', 'Map']} tintColor="#99ddff" momentary={true} selectedIndex={0}
                                 onChange={this.onChange}
            />
            {selectedComponent}
          </View>
        </ScrollView>
      );
    }
  }
}

function mapStateToProps(state,ownProps) {
  const { companyReducer,entities} = state;
  return {
    companyReducer,
    company:entities.companies[ownProps.companyProp.id],
    services:entities.companies[ownProps.companyProp.id].services ? entities.companies[ownProps.companyProp.id].services.map((service) => entities.services[service]) : []
  }
}

Company.propTypes = {
  dispatch: PropTypes.func.isRequired,
  companyProp:PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Company);
