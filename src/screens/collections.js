import React, { Component } from 'react'

import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  ScrollView,
  Image,
  Linking,
  BackHandler,
  TouchableOpacity
} from 'react-native'

import { Icon, Tile } from 'react-native-elements';

export default class Collections extends Component {
  constructor(props) {
    super(props)
    this.renderTiles = this.renderTiles.bind(this);
  }
  
  state = {
    collections: []
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.handleBackButtonClick);
  }
  
  componentDidMount() {
    const baseURL = 'https://nyx-in.herokuapp.com/api'
    fetch(`${baseURL}/v1/places/collections/all?lat=${this.props.location.coords.latitude}&long=${this.props.location.coords.longitude}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          collections: [].concat(data)
        });
      })
  }
  
  
  renderTiles() {
    if(this.state.collections.length>0) {
      const collectionTiles = this.state.collections.map((collection) => {
        console.log((Object.keys(collection.collection)))
        return(
          <Tile
            imageSrc={{ uri: collection.collection.image_url }}
            title={collection.collection.title}
            key={collection.collection.collection_id}
            featured
          />
        )
      })      
      return collectionTiles
    }
  }
  
  render() {
    return(
      <ScrollView style={styles.collectionContainer}>
        {this.renderTiles()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  collectionContainer: {
    flex: 1
  }
})