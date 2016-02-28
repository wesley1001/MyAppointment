'use strict';
import React from 'react';
import { AsyncStorage } from 'react-native';

export const API_TOKEN = 'API_TOKEN';

export const setUserToken = (token) => {

  forgetItem(API_TOKEN);

  //AsyncStorage.getItem(API_TOKEN,(err,val)=>{
  //  console.log('Async token before login ',val);
  //});

  AsyncStorage.setItem(API_TOKEN, token, (err)=> {
    if (err) {
      throw err;
    }
  });
  //AsyncStorage.getItem(API_TOKEN,(err,val)=>{
  //  console.log('Async token after login ',val);
  //});
};

export const getUserToken = () => {
  //return AsyncStorage.getItem(API_TOKEN);
  return AsyncStorage.getItem(API_TOKEN);
};

export const forgetItem = (key)=> {
  AsyncStorage.removeItem(key);
};