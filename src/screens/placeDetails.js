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
} from 'react-native';

import { Divider, Button } from 'react-native-elements';

//  Pure component, doesn't have any logic/state
export default class PlaceDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderCostForTwo() {
    return(
      <View style={styles.row}>
        <View styles={styles.linkContainer}>
          <Text style={styles.firstRowLink2}>
            cost for two
          </Text>
        </View>
        <View styles={styles.linkContainer}>
          <Text style={styles.firstRowLink2}>
            {`₹${this.props.selectedPlace.restaurant.average_cost_for_two}`}
          </Text>
        </View>
      </View>
    )
  }

  renderCuisines() {
    return(
      <View style={styles.columnsInRow}>
        <View style={styles.subrow}>
          <Text style={styles.cuisineText}>
            cuisines
          </Text>
        </View>
        <View style={styles.subrow}>
          <Text style={styles.cuisineText}>
            {this.props.selectedPlace.restaurant.cuisines}
          </Text>
        </View>
      </View>
    )
  }
  
  render() {
    if(!(Object.keys(this.props.selectedPlace).length === 0 && this.props.selectedPlace.constructor === Object)) {
      return(
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.placeDetailsContainer}
        >
          <View style={styles.placeContainer}>
            <View style={styles.placeHeading}>
              <Text style={styles.header}>
                {this.props.selectedPlace.restaurant.name}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 250, height: 250 }}
                resizeMode="cover"
                source={{ uri: this.props.selectedPlace.restaurant.thumb }}
              />
            </View>
          </View>

          <View style={styles.locality}>
            <Text
              style={styles.localityText}>
              {this.props.selectedPlace.restaurant.location.locality_verbose}
            </Text>
          </View>

          <Divider style={{ backgroundColor: '#A9A9A9' }} />

          <View style={styles.row}>
            <View style={styles.linkContainer}>
              <Text
                style={{color: `#${this.props.selectedPlace.restaurant.user_rating.rating_color}`, fontSize: 20, textAlign: 'center', fontFamily: 'source-sans-pro', fontWeight: 'bold'}}>
                {`${this.props.selectedPlace.restaurant.user_rating.aggregate_rating}/5`}
              </Text>
            </View>
            <View style={styles.linkContainer}>
              <Text
                style={styles.firstRowLink2}
                onPress={() => Linking.openURL(this.props.place_directions).catch(err => console.error('An error occurred', err))}>
                directions
              </Text>
            </View>
          </View>

          <Divider style={{ backgroundColor: '#A9A9A9' }} />

          {this.renderCostForTwo()}
          <Divider style={{ backgroundColor: '#A9A9A9' }} />

          {this.renderCuisines()}
        </ScrollView>
      )
    } else {
      this.props.resetSelectedPlace();
    }
  }
}

const styles = StyleSheet.create({
  placeContainer: {
    marginTop: 15
  },
  detailStyle: {
    height: '200',
    backgroundColor: 'lightblue'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeHeading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locality: {
    margin: 10,
  },
  localityText: {
    color: '#64818F',
    fontFamily: 'proza-libre',
    textAlign: 'center',
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  columnsInRow: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  subrow: {
    flexDirection: 'column'
  },
  cuisineText: {
    margin: 5,
    color: '#413C3B',
    textAlign: 'center',
    fontSize: 20
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeDetailsContainer: {
    margin: 10
  },
  firstRowLink2: {
    color: '#234a95',
    textAlign: 'center',
    fontFamily: 'source-sans-pro',
    fontSize: 20
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 26,
    color: '#64818F',
    textAlign: 'center',
    fontFamily: 'proza-libre'
  }
})
