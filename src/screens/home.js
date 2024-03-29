import React, { Component } from 'react'
// import { Font } from 'expo';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'

import Tabs from '../helper/tabs'
import PlayButton from '../helper/playButton'

import Feed from '../screens/subscreens/feedPage'
import Discover from '../screens/subscreens/discover'
import Storage from '../helper/storage'
export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    fontsLoaded: true,
    locationS:null,
    placesS:null,
  }
  componentWillMount()
  {
    Storage.getItem('location').then((location) => {
      if (location != null) {
         this.setState({locationS:location})
         Storage.getItem('places').then((places) => {
          if (location != null) {
             this.setState({placesS:places})
          }
        });
      }
    });
  }
  async componentDidMount() {
    // await Font.loadAsync({
    //   'source-sans-pro': require('../../assets/fonts/SourceSansPro-Light.ttf'),
    //   'proza-libre': require('../../assets/fonts/ProzaLibre-Regular.ttf'),
    //   'overlock': require('../../assets/fonts/Overlock-Bold.ttf')
    // });
    // this.setState({ fontsLoaded: true });
    // Text.defaultProps.style = { fontFamily: 'source-sans-pro' }
  }

  render() {
    if(this.state.fontsLoaded) {
      return(
        <View style={styles.container}>
        {
          this.state.locationS!=null && this.state.placesS!=null?
          <Tabs>
          {/* First tab */}
          <View title="PLACES" style={styles.content}>
            <Feed
              places={this.state.placesS}
              location={this.state.locationS}
            />
          </View>
          {/* Second tab */}
          <View title="DISCOVER" style={styles.content}>
            <Discover
              location={this.state.locationS}
            />
          </View>
         </Tabs>:null
        }
         
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  headline: {
    alignItems: 'center'
  },
  headlineText: {
    color: '#FFFFFF',                   // White color
    // fontFamily: 'notoserif'
  },
  // App container
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  // Tab content container
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  // Content header
  header: {
    margin: 10,
    color: '#234a95',
    fontSize: 26,
    // fontFamily: 'proza-libre'
  },
  // Content text
  text: {
    marginHorizontal: 20,
    color: '#234a95',
    // fontFamily: 'source-sans-pro',
    textAlign: 'center',
    fontSize: 18,
  }
});
