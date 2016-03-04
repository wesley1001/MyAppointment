'use strict';
import React from 'react';
import { Component, Navigator, StatusBarIOS } from 'react-native';
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux';
import { loginUserByToken } from './actions/Auth/login';
import { fetchFavorites } from './actions/favorites';
import { fetchAppointments } from './actions/appointments';

import { connect } from 'react-redux';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Categories from './containers/Category/Categories';
import Test from './containers/Category/Test';
import Category from './containers/Category/Category';
import Company from './containers/Company/Company';
import Appointment from './containers/Appointment/Appointment';
import Map from './containers/Company/Map';
import Settings from './containers/Settings';
import Favorites from './containers/User/Favorites';
import Appointments from './containers/User/Appointments';
import TabIcon from './components/TabIcon';
import LoginDialog from './components/LoginDialog';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(loginUserByToken()).then((success)=>{
      if(success) {
        dispatch(fetchFavorites());
        //dispatch(fetchAppointments());
      }
    });
  }

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {
    return (
      <Router hideNavBar={true} >

        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default"
                sceneConfig={Navigator.SceneConfigs.FloatFromRight}
                navigationBarStyle={{backgroundColor: '#99ddff',alignItems:'center'}}
                titleStyle={{ color:'white', fontSize:15, fontFamily:'Menlo-Bold',alignSelf:'center'}}
                barButtonTextStyle={{ fontSize:15, color:'white',alignSelf:'center',fontFamily:'Menlo-Bold' }}
                backIcon={{tintColor:'white',backgroundColor:'white',fontFamily:'Menlo-Bold'}}
        />
        <Schema name="tab" type="switch" icon={TabIcon}/>

        <Route name="home">
          <Router footer={TabBar} tabBarStyle={{backgroundColor:'#99ddff'}} showNavigationBar={false}>
            <Route name="main" title="Home" schema="tab" hideNavBar={false} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline">
              <Router name="mainRouter">
                <Route name="categories" component={Categories} hideNavBar={true} title=""/>
                <Route name="categoryEntity" component={Category} title=""/>
                <Route name="companyEntity" component={Company} title=""/>
                <Route name="appointmentContainer" component={Appointment} title=""  />
              </Router>
            </Route>
            <Route name="browse" schema="tab" title="Browse" hideNavBar={true}  selectedTabIcon="ion|ios-location" tabIcon="ion|ios-location-outline">
              <Router>
                <Route name="services" component={Map} title="Map" />
              </Router>
            </Route>
            <Route name="favorites" schema="tab" name="favorites" component={Favorites} selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"/>
            <Route name="appointments" schema="tab" title="Appointments" component={Appointments} hideNavBar={true}  selectedTabIcon="ion|ios-alarm" tabIcon="ion|ios-alarm-outline"/>
            <Route name="settings" schema="tab" title="Settings" component={Settings} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline" />
          </Router>
        </Route>
        <Route name="login" title="Login" component={Login} hideNavBar={true} />
        <Route name="register" component={Register} title="Register" schema="default" hideNavBar={true}/>
        <Route name="loginDialog" schema="modal" hideNavBar={true}  component={LoginDialog} />
      </Router>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state,
    user: state.user
  }
}

export default connect(mapStateToProps)(App);

