import React, { Component } from 'react'
import { BackHandler } from 'react-native';

import {
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { Divider, Button } from 'react-native-elements';
import { Tile, Card, Image, View, Subtitle, Caption } from '@shoutem/ui';
const baseURL = 'https://nyx-in.herokuapp.com/api'

export default class Collections extends Component {
  constructor(props) {
    super(props)
  }

  renderTiles() {
    const collectionTiles = this.props.collections.map((collection) => {
      return(
        <Card>
          <Image
            styleName="medium-wide"
              source={{uri: collection.image_url}}
          />
          <View styleName="content">
            <Subtitle>{collection.name}</Subtitle>
            <Caption>{collection.description}</Caption>
          </View>
        </Card>
      );
    })
    return collectionTiles;
  }

  render() {
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
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
