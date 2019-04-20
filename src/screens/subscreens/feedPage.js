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

import { Icon } from 'react-native-elements';

import FeedCard from '../feedCard';
// import Pill from '../../ui-components/pill';
import PlaceDetails from '../placeDetails';
import Collections from '../collections';

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlace: {},
      showCollections: false,
      collections: []
    }
    this.setPlace = this.setPlace.bind(this);
    this.showCollections = this.showCollections.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleCollectionsBackButtonClick = this.handleCollectionsBackButtonClick.bind(this);
    this.resetSelectedPlace = this.resetSelectedPlace.bind(this);
  }

  resetSelectedPlace() {
    this.setState({
      selectedPlace: {}
    });
  }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.setState({
      selectedPlace: {}
    });
    return true;
  }
  
  handleCollectionsBackButtonClick() {
    this.setState({
      showCollections: false
    })
  }

  setPlace(place) {
    this.setState({
      selectedPlace: place
    });
  }
  
  showCollections() {
    this.setState({
      showCollections: true
    })
  }

  renderListOfPlaces() {
    const cards = this.props.places.map((place) => {
      return(
        <TouchableOpacity
          onPress={() => this.setPlace(place)}
          key={place.restaurant.id}
          activeOpacity={1}
        >
          <FeedCard cardTitle={place.restaurant.name} cardPicture={place.restaurant.thumb} key={place.restaurant.id}/>
        </TouchableOpacity>
      )
    });
    return(
      <ScrollView contentContainerStyle={styles.bgContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.showCollections()}>
            <View style={styles.collectionHeadingContainer}>
              <Image
                style={styles.collectionHeadlineImage}
                source={require('../../assets/curated-min.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View contentContainerStyle={styles.bgInnerContainer}>
          <Text style={styles.feedCardsHeadingContainer}>
            <Text style={styles.feedCardsHeading}>
              Closest
            </Text>
            <Text style={styles.feedCardsText}>
              {' to you.'}
            </Text>
          </Text>
        </View>
        <ScrollView>
          {cards}
        </ScrollView>
      </ScrollView>
    );
  }

  renderPlaceDetails() {
    console.log('renderPlaceDetails called')
    var place_directions = `https://www.google.com/maps/dir/?api=1&origin=${this.props.location.coords.latitude},${this.props.location.coords.longitude}&destination=${this.state.selectedPlace.restaurant.location.latitude},${this.state.selectedPlace.restaurant.location.longitude}`
    console.log('The directions URL is : ' + place_directions);
    return(
      <PlaceDetails
        selectedPlace={this.state.selectedPlace}
        resetSelectedPlace={this.resetSelectedPlace}
        place_directions={place_directions}
      />
    )
  }

  render() {
    if(this.state.showCollections) {
      return(
        <ScrollView showsVerticalScrollIndicator={false} styles={styles.container}>
          <Collections location={this.props.location} handleBackButtonClick={this.handleCollectionsBackButtonClick} />
        </ScrollView>
      )
    }
    return(
      <ScrollView showsVerticalScrollIndicator={false} styles={styles.container}>
        {Object.keys(this.state.selectedPlace).length === 0 && this.state.selectedPlace.constructor === Object ? this.renderListOfPlaces() : this.renderPlaceDetails()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  collectionHeadingContainer: {
    backgroundColor: '#64818F',
  },
  collectionHeadlineImage: {
    height: 100
  },
  collectionText: {
    color: 'white',
    margin: 10
  },
  bgContainer: {

  },
  bgInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  feedCardsHeadingContainer: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#64818F"
  },
  feedCardsHeading: {
    fontSize: 30,
    color: '#64818F',
    fontWeight: 'bold'
  },
  feedCardsText: {
    fontSize: 30,
    color: '#64818F',
    margin: 5,
  }
});
