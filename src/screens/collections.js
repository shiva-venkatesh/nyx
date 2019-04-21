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

import { Icon, Text } from 'react-native-elements';
import { ImageBackground, Tile, Title, Overlay, Subtitle, Button, Caption } from '@shoutem/ui';

const baseURL = 'https://artemis.nyx.co.in/api'

import FeedCard from './feedCard';
import PlaceDetails from './placeDetails';

export default class Collections extends Component {
  constructor(props) {
    super(props)
    this.renderTiles = this.renderTiles.bind(this);
    this.renderListOfPlaces = this.renderListOfPlaces.bind(this);
    this.setActiveCollection = this.setActiveCollection.bind(this);
    this.setActivePlace = this.setActivePlace.bind(this);
    this.resetCollections = this.resetCollections.bind(this);
    this.resetSelectedPlace = this.resetSelectedPlace.bind(this);
  }
  
  state = {
    collections: [],
    places: [],
    activeCollectionName: '',
    activePlace: {}
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
  
  resetCollections() {
    this.setState({
      activeCollectionName: '',
      activeCollectionDescription: '',
      places: [].slice()
    })
  }
  
  setActivePlace(place) {
    this.setState({
      activePlace: Object.assign({}, place)
    })
  }
  
  resetSelectedPlace() {
    this.setState({
      selectedPlace: {}
    });
  }
  
  renderListOfPlaces() {
    if(!(Object.entries(this.state.activePlace).length === 0 && this.state.activePlace.constructor === Object)) {
      var place_directions = `https://www.google.com/maps/dir/?api=1&origin=${this.props.location.coords.latitude},${this.props.location.coords.longitude}&destination=${this.state.activePlace.restaurant.location.latitude},${this.state.activePlace.restaurant.location.longitude}`
      return(
        <PlaceDetails
          selectedPlace={this.state.activePlace}
          place_directions={place_directions}
          resetSelectedPlace={this.resetSelectedPlace}
        />
      );
    } else {
      const cards = this.state.places.map((place) => {
        return(
          <TouchableOpacity
            onPress={() => this.setActivePlace(place)}
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
            <TouchableOpacity onPress={() => this.resetCollections()}>
              <View style={styles.collectionHeadingContainer}>
                <Icon
                  name='chevron-left'
                  type='font-awesome'
                  color='#6495ed'
                />
                <Text style={styles.collectionText}>
                  COLLECTIONS
                </Text>
              </View>
            </TouchableOpacity>
            <Text h3 style={styles.headingStyle}>
              {this.state.activeCollectionName}
            </Text>
            <Text style={styles.collectionDescription}>
              {this.state.activeCollectionDescription}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {cards}
          </ScrollView>
        </ScrollView>
      );      
    }
  }
  
  renderTiles() {
    if(this.state.collections.length>0) {
      const collectionTiles = this.state.collections.map((collection) => {
        console.log((Object.keys(collection.collection)))
        return(
          <TouchableOpacity onPress={() => this.setActiveCollection(collection.collection.collection_id, collection.collection.title, collection.collection.description)}>
            <ImageBackground
              styleName="large-banner"
              source={{ uri: collection.collection.image_url }}
            >
              <Tile>
                <Overlay styleName="solid-bright">
                  <Title>{collection.collection.title}</Title>
                </Overlay>
              </Tile>
            </ImageBackground>
          </TouchableOpacity>
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
  collectionHeadingContainer: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  collectionText: {
    color: 'cornflowerblue',
    margin: 10
  },
  collectionTitle: {
    margin: 10
  },
  headingStyle: {
    fontFamily: 'Roboto'
  },
  collectionDescription: {
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  collectionDescriptionContainer: {
    flexDirection: 'column'
  }
});