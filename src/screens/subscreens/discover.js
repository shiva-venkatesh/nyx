import React, { Component } from 'react'
// import { MapView } from 'expo';

import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

import { SearchBar, Tile } from 'react-native-elements'


export default class Discover extends Component {

  constructor(props) {
    super(props)
    this.renderTiles = this.renderTiles.bind(this);
  }

  renderTiles() {
      return(
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={1}>
              <Tile
                activeOpacity={1}
                imageSrc={require('../../assets/categories.jpg')}
                title={'CATEGORIES'}
                featured
              />
            </TouchableOpacity>
          </View>

          <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={1}>
              <Tile
                activeOpacity={1}
                imageSrc={require('../../assets/cuisines.jpg')}
                title={'CUISINES'}
                featured
              />
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  renderSearch() {
    return(
      <SearchBar
        lightTheme
        containerStyle={styles.searchInputContainer}
        showLoading
        placeholder={'Find a place'}
        platform="default"
        placeHolderTextColor={styles.placeHolderTextColor}
        cancelButtonTitle="Cancel" />
    )
  }

  render() {
    return(
      <ScrollView>
        {this.renderTiles()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 0.5
  },
  placeHolderTextColor: {
    color: '#FFFFFF'
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    // textAlign: 'center',
  }
})
