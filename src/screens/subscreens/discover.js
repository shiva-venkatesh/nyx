import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  WebView,
  Dimensions,
  ActivityIndicator,
  Linking
} from 'react-native'

import { SearchBar, Tile } from 'react-native-elements'
import FeedCard from '../feedCard';
import EventDetails from '../eventDetails';

const baseURL = 'https://artemis.nyx.co.in/api'

export default class Discover extends Component {
  state = {
    events: [],
    activeEvent: {}
  }

  constructor(props) {
    super(props)
    this.renderTiles = this.renderTiles.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.renderEventDetails = this.renderEventDetails.bind(this);
  }

  componentDidMount() {
    const events_url = `${baseURL}/v1/events`
    fetch(events_url)
      .then(response => response.json())
      .then(data => {
        console.log(data + ' response from the events API')
        this.setState({
          events: [].concat(data)
        });
      })
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

  renderEvents() {
    if(this.state.events.length > 0) {
      console.log('Gets here')
      const eventCards = this.state.events.map((event) => {
        return(
          <TouchableOpacity
            onPress={() => Linking.openURL(event.map_link)}
            key={event._id}
            activeOpacity={1}
          >
            <FeedCard cardTitle={event.name} cardPicture={event.vertical_cover_image} key={event._id}/>
          </TouchableOpacity>
        )
      })
      return(
        <ScrollView style={styles.bgContainer}>
          {eventCards}
        </ScrollView>
      )
    } else {
      return(
        <View style={[styles.spinnerContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#413C3B" />
        </View>
      )
    }
  }

  setActiveEvent(event) {
    this.setState({
      activeEvent: Object.assign({}, event)
    })
  }

  renderEventDetails() {
    if(this.state.activeEvent) {
      return(
        <EventDetails
          event={this.state.activeEvent}
        />
      )
    }
    return null
  }

  render() {
    if(Object.keys(this.state.activeEvent).length === 0 && this.state.activeEvent.constructor === Object) {
      return(
        <ScrollView>
          {this.renderEvents()}
        </ScrollView>
      )
    } else {
      return(
        <ScrollView showsVerticalScrollIndicator={false} styles={styles.container}>
          {this.renderEventDetails()}
        </ScrollView>
      )
    }
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  webview: {
      width: deviceWidth,
      height: deviceHeight
  },
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },
  centeredSpinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    flex: 0.5
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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
