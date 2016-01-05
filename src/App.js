'use strict';
import React, { Component, StyleSheet,Navigator,Text,View,Image,StatusBarIOS} from 'react-native';
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
      <Router hideNavBar={true} initialRoutes={['category']}>

        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>
        <Schema name="tab" type="switch" icon={TabIcon}/>

        <Route name="login" component={Login} title="Login"
               hideNavBar={false}
               navigationBarStyle={{backgroundColor: ' rgb(217, 102, 255)',borderBottomColor: ' rgb(217, 102, 255)'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
               schema="default"
          />

        <Route name="register" component={Register} title="Register" schema="default" hideNavBar={false}/>

        <Route name="category">
          <Router showNavigationBar={true}
                  navigationBarStyle={{backgroundColor: ' rgb(217, 102, 255)',borderBottomColor: '#5BC3BE'}}
                  style={{backgroundColor:' rgb(217, 102, 255)'}}
                  titleStyle={{ color:'white', fontSize:17}}
                  barButtonTextStyle={{ fontSize:17, color:'white' }}
            >
            <Route name="categories" schema="default" title="My Appointment"
                   navigationBarStyle={{backgroundColor: ' rgb(217, 102, 255)',borderBottomColor: ' rgb(217, 102, 255)'}}
                   titleStyle={{ color:'white', fontSize:17}}
                   barButtonTextStyle={{ fontSize:17, color:'white' }}
                   component={Categories}
                   hideNavBar={false}
                   type="replace"
              />

            <Route name="categoryEntity" component={Category} title=""
                   hideNavBar={false}
              />

            <Route name="companyEntity" component={Company} title=""
                   hideNavBar={false}
              />

            <Route name="serviceEntity" component={Service} title=""
                   hideNavBar={false}
              />


          </Router>

        </Route>
      </Router>

    )
  }
}

