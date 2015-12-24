'use strict';
import React,{AsyncStorage} from 'react-native';

export const USER_STORAGE_KEY = 'user';

export const saveUser = (user, cb)=> {

  forgetItem(USER_STORAGE_KEY);

  AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user), (err)=> {
    if (err) {
      throw err;
    }
  });
}

export const getUser = (cb)=> {
  AsyncStorage.getItem(USER_STORAGE_KEY, (err, val)=> {
    return cb(JSON.parse(val));
  });
}

const forgetItem = (key)=> {
  AsyncStorage.removeItem(key);
}