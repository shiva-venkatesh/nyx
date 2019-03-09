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

import { Divider, Button, Text } from 'react-native-elements';
const baseURL = 'https://nyx-in.herokuapp.com/api'

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    event: {}
  }

  componentDidMount() {
    fetch(`${baseURL}/v1/events/${this.props.event._id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          event: Object.assign({}, data)
        });
      })
  }

  render() {
    return(
      <ScrollView showsVerticalScrollIndicator={true} style={styles.detailContainer}>
        <Text h1>
          {this.props.event.name}
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1
  }
})
