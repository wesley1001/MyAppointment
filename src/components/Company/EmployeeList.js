'use strict';

import React from 'react';
import { Component, View, Text, TouchableHighlight, StyleSheet,ListView } from 'react-native';
import { Icon } from 'react-native-icons';

export default class EmployeeList extends Component {

  renderRow(employee) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.props.onEmployeeSelect(employee)} underlayColor="transparent">
            <View style={styles.cellWrapper}>
              <Icon
                name='ion|person-add'
                size={24}
                color={'gray'}
                style={styles.followIcon}
              />
              <Text style={styles.title}>
                {employee.name_en}
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.separator}/>
        </View>
      </View>
    );
  }

  render() {
    const {employees} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = employees ? ds.cloneWithRows(employees) : ds.cloneWithRows([]);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.container}
        contentContainerStyle={{justifyContent:'flex-start',alignItems:'flex-start'}}
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection:'row',

    marginTop:5,
    marginBottom:5
  },
  cellWrapper:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  title: {
    fontSize: 15,
    textAlign: 'left',
    color: '#DA552F',
    alignSelf:'flex-start',
    paddingLeft:10,
    paddingRight:10
  },
  separator: {
    height:0.5,
    backgroundColor:'#E8E8E8'
  },
  followIcon: {
    height:20,
    width:20,
    alignSelf:'flex-start'
  }

});
