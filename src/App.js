'use strict';
import React, { Component, Navigator, StatusBarIOS,Text} from 'react-native';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Categories from './containers/Category/Categories';
import Category from './containers/Category/Category';
import Company from './containers/Company/Company';
import Service from './containers/Service/Service';
import TabIcon from './components/TabIcon';
import Map from './containers/Company/Map';
import Settings from './components/Settings';
export default class App extends Component {

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

        <Route name="auth" hideNavBar={true} >
          <Router>
            <Route name="login" component={Login} initial={true}/>
            <Route name="register" component={Register} title="Register" schema="default" hideNavBar={false}/>
          </Router>
        </Route>

        <Route name="home">
          <Router footer={TabBar} tabBarStyle={{backgroundColor:'#99ddff'}} showNavigationBar={false}>
            <Route name="tab1" schema="tab" title="Home" hideNavBar={false} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline">
              <Router >
                <Route name="categories" component={Categories} hideNavBar={true}/>
                <Route name="categoryEntity" component={Category} />
                <Route name="companyEntity" component={Company} />
                <Route name="serviceEntity" component={Service}  />
              </Router>
            </Route>
            <Route name="tab2" schema="tab" title="Browse" hideNavBar={true}  selectedTabIcon="ion|ios-location" tabIcon="ion|ios-location-outline">
              <Router>
                <Route name="tab2_1" component={Map} title="Map" />
              </Router>
            </Route>
            <Route name="settings" schema="tab" title="Settings" component={Settings} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline" />
          </Router>
        </Route>

      </Router>
    )
  }
}

