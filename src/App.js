'use strict';
import React from 'react';
import { Component, Navigator, StatusBarIOS } from 'react-native';
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux';
import { loginUserByToken } from './actions/Auth/login';
import { connect } from 'react-redux';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Categories from './containers/Category/Categories';
import Category from './containers/Category/Category';
import Company from './containers/Company/Company';
import Appointment from './containers/Appointment/Appointment';
import TabIcon from './components/TabIcon';
import Map from './containers/Company/Map';
import Settings from './components/Settings';
import LoginDialog from './components/LoginDialog';
import Favorites from './containers/User/Favorites';
import Appointments from './containers/User/Appointments';


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loginUserByToken());
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
        <Schema name="tab" type="switch" icon={TabIcon}  />

        <Route name="home">
          <Router footer={TabBar} tabBarStyle={{backgroundColor:'#99ddff'}} showNavigationBar={false}>

            <Route name="main" title="Home" schema="tab" hideNavBar={false} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline">
              <Router >
                <Route name="categories" component={Categories} hideNavBar={true} title=""/>
                <Route name="categoryEntity" component={Category} title=""/>
                <Route name="companyEntity" component={Company} title=""/>
                <Route auth={true} name="appointmentContainer" component={Appointment} title=""  />
              </Router>
            </Route>
            <Route name="browse" schema="tab" title="Browse" hideNavBar={true}  selectedTabIcon="ion|ios-location" tabIcon="ion|ios-location-outline">
              <Router>
                <Route name="services" component={Map} title="Map" />
              </Router>
            </Route>
            <Route auth={true} name="favorites" component={Favorites} schema="tab" title="Favorites" hideNavBar={true}  selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"/>
            <Route auth={true} name="appointments" schema="tab" title="Appointments" component={Appointments} hideNavBar={true}  selectedTabIcon="ion|ios-alarm" tabIcon="ion|ios-alarm-outline"/>
            <Route name="settings" schema="tab" title="Settings" component={Settings} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline" />
          </Router>
        </Route>

        <Route name="auth" hideNavBar={true} >
          <Router>
            <Route name="login" title="Login" component={Login} />
            <Route name="register" component={Register} title="Register" schema="default" hideNavBar={false}/>
          </Router>
        </Route>

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

