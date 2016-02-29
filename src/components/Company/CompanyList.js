'use strict';

import React, { PropTypes } from 'react';
import { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { Icon } from 'react-native-icons';

export default class CompanyList extends Component {

  renderRow(company) {
    const {loadCompany,favoriteCompany} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => loadCompany(company)} underlayColor="transparent">
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image style={styles.thumbnail} source={{uri:company.image}}/>
            <View style={{flexDirection:'column',marginLeft:10,justifyContent:'center',alignItems:'center'}} >
              <Text style={styles.name} numberOfLines={5}> {company.name_en}</Text>
              <View style={{flexDirection:'row',marginTop:5}}>
                <Icon
                  name='ion|location'
                  size={20}
                  color={'#99ddff'}
                  style={styles.followIcon}
                />
                <Text style={styles.city}>{company.city_en},{company.address_en}</Text>
              </View>
              <TouchableHighlight onPress={() => favoriteCompany(company)} underlayColor="transparent">
                <Icon
                  name='ion|android-favorite-outline'
                  size={30}
                  color={'red'}
                  style={styles.heartIcon}
                  j
                />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const {companies} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = companies ? ds.cloneWithRows(companies) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        contentInset={{bottom:49}}
        style={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
        ref='listView'
      />
    )

  }
}

CompanyList.propTypes = ({
  loadCompany:PropTypes.func.isRequired,
  companies:PropTypes.array.isRequired,
  favoriteCompany:PropTypes.func.isRequired,
});

var styles = StyleSheet.create({

  list:{
    padding:10
  },
  container: {
    marginBottom: 10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: 'white',
    opacity: 0.7,
    shadowColor: "red",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  name: {
    color: 'turquoise',
    textAlign:'left',
    fontWeight:'700',
    fontSize:16

  },
  description: {
    color: 'black',
    fontSize: 15,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  city:{
    color:'gray',
    alignSelf:'center'
  },
  followIcon: {
    height:20,
    width:20
  },
  heartIcon:{
    height:30,
    width:30,
  }

});