import React,{Component} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './App';
import CodePush from "react-native-code-push";
import { loginUserByToken } from './actions/Auth/login';
import { fetchFavorites } from './actions/favorites';
import { fetchAppointments } from './actions/appointments';
const store = configureStore();

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
    //store.dispatch(loginUserByToken()).then((success)=>{
    //  if(success) {
    //    dispatch(fetchFavorites());
    //    //dispatch(fetchAppointments());
    //  }
    //});

  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Root;