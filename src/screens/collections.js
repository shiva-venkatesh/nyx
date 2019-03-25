import React, { Component } from 'react'

import {
  StyleSheet,   // CSS-like styles
  View,
  ScrollView,
  Image,
  Linking,
  BackHandler,
  TouchableOpacity
} from 'react-native'

import { Icon, Tile, Text } from 'react-native-elements';
const baseURL = 'https://artemis.nyx.co.in/api'

import FeedCard from './feedCard';

export default class Collections extends Component {
  constructor(props) {
    super(props)
    this.renderTiles = this.renderTiles.bind(this);
    this.renderListOfPlaces = this.renderListOfPlaces.bind(this);
    this.setActiveCollection = this.setActiveCollection.bind(this);
  }
  
  state = {
    collections: [],
    places: [],
    activeCollectionName: ''
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.handleBackButtonClick);
  }
  
  componentDidMount() {
    fetch(`${baseURL}/v1/places/collections/all?lat=${this.props.location.coords.latitude}&long=${this.props.location.coords.longitude}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          collections: [].concat(data)
        });
      })
  }
  
  setActiveCollection(collection_id, collection_name, collection_description) {
    console.log('triggered')
    if(collection_id) {
      let collectionsURL = `${baseURL}/v1/places/collections/${collection_id}/?lat=${this.props.location.coords.latitude}&long=${this.props.location.coords.longitude}`;
      fetch(collectionsURL)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            places: [].concat(data),
            activeCollectionName: collection_name,
            activeCollectionDescription: collection_description
          });
        })
    }
  }
  
  renderListOfPlaces() {
    console.log("gets here!!")
    const cards = this.state.places.map((place) => {
      return(
        <TouchableOpacity
          onPress={() => console.log(place.restaurant.name)}
          key={place.restaurant.id}
          activeOpacity={1}
        >
          <FeedCard cardTitle={place.restaurant.name} cardPicture={place.restaurant.thumb} key={place.restaurant.id}/>
        </TouchableOpacity>
      );
    })
    return(
      <ScrollView style={styles.collectionDescriptionContainer}>
        <View style={styles.collectionTitle}>
          <Text h3>
            {this.state.activeCollectionName}
          </Text>
          <Text>
            {this.state.activeCollectionDescription}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          {cards}
        </ScrollView>
      </ScrollView>
    )
  }
  
  renderTiles() {
    if(this.state.collections.length>0) {
      const collectionTiles = this.state.collections.map((collection) => {
        console.log((Object.keys(collection.collection)))
        return(
            <Tile
              imageSrc={{ uri: collection.collection.image_url }}
              onPress={() => this.setActiveCollection(collection.collection.collection_id, collection.collection.title, collection.collection.description)}
              title={collection.collection.title}
              key={collection.collection.collection_id}
              featured
            />
        );
      })
      return collectionTiles;
    }
  }
  
  render() {
    return(
      <ScrollView style={styles.collectionContainer}>
        {typeof this.state.places !== 'undefined' && this.state.places.length > 0 ? this.renderListOfPlaces() : this.renderTiles()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  collectionContainer: {
    flex: 1
  },
  collectionTitle: {
    margin: 10
  },
  collectionDescriptionContainer: {
    flexDirection: 'column'
  }
});