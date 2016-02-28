import React,{Component} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './App';
import CodePush from "react-native-code-push";

class Root extends Component {

  constructor(props) {
    super(props);
    //CodePush.sync();
  }

  componentDidMount() {
    // first get the user storage key
    // if found authenticate the user
    // set isAuthenticated to true
    // if storage key not found, set isAuthenticated to false
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}

export default Root;