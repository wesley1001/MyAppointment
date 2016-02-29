import React,{
  PropTypes,
  StyleSheet,
  View,
  Text,
  Image,
  Component
} from 'react-native';

import Button from 'apsl-react-native-button';
import { assets } from './../utils/assets';
const Actions = require('react-native-router-flux').Actions;

export default class LoginDialog extends Component {

  render() {
    return (
      <Image source={assets.bg} style={styles.container}>
        <View style={styles.dialogWrapper}>
          <Text style={styles.dialogText}>
            {this.props.dialogText}
          </Text>
          <Button
            style={styles.button}
            onPress={()=>Actions.auth()}
            textStyle={{fontSize: 18, color:'white'}}
          >
            Login
          </Button>
          <Text style={styles.orText}>
            OR
          </Text>
          <Button
            style={styles.button}
            onPress={()=>Actions.main()}
            textStyle={{fontSize: 18, color:'white'}}
          >
            Sign up
          </Button>

        </View>
      </Image>
    );
  }
}

LoginDialog.propTypes = ({
  dialogText:PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    justifyContent:'center',
  },
  dialogWrapper:{
    backgroundColor:'white',
    opacity:0.9,
    paddingTop:50,
    paddingBottom:100,
    padding:20,
    margin:30,
    alignItems:'center'
  },
  dialogText:{
    fontSize:16,
    padding:10,
  },
  orText:{
    paddingBottom:10
  },
  button: {
    backgroundColor: '#5BC3BE',
    borderColor: '#5BC3BE',
    borderRadius: 0,
    opacity:1
  }
});