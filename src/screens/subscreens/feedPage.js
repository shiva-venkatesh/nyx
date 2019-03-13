import React, { Component } from 'react'
import { BackHandler } from 'react-native';

import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native'

import FeedCard from '../feedCard';
// import Pill from '../../ui-components/pill';
import PlaceDetails from '../placeDetails';

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlace: {}
    }
    this.setPlace = this.setPlace.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.resetSelectedPlace = this.resetSelectedPlace.bind(this);
  }

  componentDidMount() {

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

  setPlace(place) {
    this.setState({
      selectedPlace: place
    }, () => {
      console.log(this.state.selectedPlace.restaurant.name);
    });
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
      <ScrollView horizontal={true} style={styles.bgContainer}>
        <View>
          <Text style={styles.feedCardsHeadingContainer}>
            <Text style={styles.feedCardsHeading}>
              Closest
            </Text>
            <Text style={styles.feedCardsText}>
              {' to you.'}
            </Text>
          </Text>
        </View>
        {cards}
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
    return(
      <ScrollView horizontal={true} styles={styles.container}>
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
  bgContainer: {
    // backgroundColor: ''
    flexDirection: 'column'
  },
  pill_objects: {
    marginTop: 15
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
  },
  cost: {
    fontSize: 20
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 26,
    color: '#413C3B',
    textAlign: 'center',
    fontFamily: 'proza-libre'
  }
});
