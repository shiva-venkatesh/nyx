import React, { Component } from 'react'
import { BackHandler } from 'react-native';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';

import { Divider, Button, Text, Tile } from 'react-native-elements';
const baseURL = 'https://nyx-in.herokuapp.com/api'

export default class Collections extends Component {
  constructor(props) {
    super(props)
  }

  renderTiles() {
    const collectionTiles = this.props.collections.map((collection) => {
      var tileImage = collection.image_url;
      return(
        <Tile
          imageSrc={{uri: tileImage}}
          title={collection.title}
          caption={collection.description}
        />
      );
    })
    return collectionTiles;
  }

  render() {
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {this.renderTiles()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  }
})
