'use strict';
import React, { Component, Navigator, StatusBarIOS} from 'react-native';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import TabIcon from './components/TabIcon';
import Categories from './containers/Category/Categories';
import Category from './containers/Category/Category';
import Company from './containers/Company/Company';
import Service from './containers/Service/Service';

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
                navigationBarStyle={{backgroundColor: ' rgb(217, 102, 255)'}}
                titleStyle={{ color:'white', fontSize:17}}
                barButtonTextStyle={{ fontSize:17, color:'white' }}
        />
        <Route name="login" component={Login} initial={true} />
        <Route name="register" component={Register} title="Register" schema="default" hideNavBar={false}/>
        <Route name="home" >
          <Router hideNavBar={false} >
            <Route name="categories" component={Categories} hideNavBar={true} type="replace"/>
            <Route name="categoryEntity" component={Category} />
            <Route name="companyEntity" component={Company} />
            <Route name="serviceEntity" component={Service}  />
          </Router>
        </Route>
      </Router>
    )
  }
}

