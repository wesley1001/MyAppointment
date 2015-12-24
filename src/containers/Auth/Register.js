'use strict';
import React, { Component, Text, View,  TouchableHighlight, TextInput, Image,ActivityIndicatorIOS,ScrollView,StyleSheet } from 'react-native';
import LoadingIndicator from './../../components/LoadingIndicator';
import { connect } from '../../../node_modules/react-redux/native';
import {signup,onRegisterFormFieldChange} from '../../actions/Auth/register';
import RegisterScene from './../../components/Auth/RegisterScene';

const Actions = require('react-native-router-flux').Actions;

class Register extends Component {

  constructor(props) {
    super(props);
    const {fields} = this.props.register.form;
    this.state = {
      fields: {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
        mobile: fields.mobile
      }
    };
  }


  onFieldChange(value, field) {
    let changedField = field[0];
    const { dispatch } = this.props;
    dispatch(onRegisterFormFieldChange(changedField, value[changedField]));
    this.setState({fields: value});
  }

  handleRegister() {
    const {dispatch,register} = this.props;
    const fields = this.state.fields;
    console.log('fields', JSON.stringify(fields));
    dispatch(signup(fields, (cb)=> {
      Actions.login();
    }));
  }

  handleLoginRoute() {
    Actions.login();
  }

  render() {
    const { register } = this.props;

    if (register.form.error != null) {
      alert('Error, Please try again');
    }

    return (

      <View style={styles.container}>

        {register.isFetching ? <LoadingIndicator style={{ marginTop:10}} /> : <View />}

        <RegisterScene
          register={register}
          fields={this.state.fields}
          onRegisterPress={this.handleRegister.bind(this)}
          onLoginRoutePress={this.handleLoginRoute.bind(this)}
          onChange={this.onFieldChange.bind(this)}
          />


      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 64
  }
});


function mapStateToProps(state) {
  const { register } = state;
  return {
    ...state,
    register
  }
}

export default connect(mapStateToProps)(Register)
