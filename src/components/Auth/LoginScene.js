'use strict'
import React, { Component, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import t from 'tcomb-form-native';
import FormButton from './../FormButton';
import stylesheet from '../../../assets/style/form';
const Form = t.form.Form;

export default class LoginScene extends Component {

  handleLogin() {
    this.props.onLoginPress();
  }

  handleForgotPasswordRoutePress() {
    this.props.onForgotPasswordRoutePress();
  }

  handleRegisterRoutePress() {
    this.props.onRegisterRoutePress();
  }

  render() {

    Form.stylesheet = stylesheet;

    const {login} = this.props;

    let email = {
      label: 'Email',
      placeholder: 'Email',
      keyboardType: 'email-address',
      editable: !login.isFetching,
      hasError: login.form.fields.emailHasError,
      error: 'Please enter valid email',
    };

    let password = {
      label: 'Password',
      placeholder: 'Password',
      maxLength: 12,
      secureTextEntry: true,
      editable: !login.isFetching,
      hasError: login.form.fields.passwordHasError,
      error: 'Must have 6-12 numbers, letters or special characters',
    };

    const loginForm = t.struct({
      email: t.String,
      password: t.String
    });

    const options = {
      fields: {
        email: email,
        password: password
      }
    };

    return (

      <View>

        <Form ref="form"
              type={loginForm}
              options={options}
              value={this.props.credentials}
              onChange={this.props.onChange}
          />

        <FormButton
          isDisabled={!login.form.isValid || login.isFetching}
          onPress={this.handleLogin.bind(this)}
          buttonText='الدخول'/>

        <TouchableHighlight onPress={this.handleRegisterRoutePress.bind(this)} underlayColor='transparent'
                            style={[styles.center,styles.mTop20]}
          >
          <Text style={[styles.label,styles.textUnderline]}>Don't have an account? Register</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.handleForgotPasswordRoutePress.bind(this)} style={[styles.center,styles.mTop20]}
                            underlayColor='transparent' >
          <Text style={[styles.label,styles.textUnderline]}>Forgot your password ?</Text>
        </TouchableHighlight>

      </View>
    )
  }

}

var styles = StyleSheet.create({

  label: {
    fontSize: 14,
    color: '#888888',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  ltr: {
    alignSelf: 'flex-start'
  },
  rtl: {
    alignSelf: 'flex-end'
  },
  center: {
    alignSelf: 'center'
  },
  mTop20: {
    marginTop: 50
  }
})

