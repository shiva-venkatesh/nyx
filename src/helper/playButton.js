import React, { Component } from 'react';
import {
  StyleSheet,   
  Text,         
  View,
  Image          
} from 'react-native';

import { Button } from 'react-native-elements'

const PlayButton = ({pressHandler}) => {
  return (
    <Button
      large
      icon={{ name: 'play', type: 'font-awesome', buttonStyle: styles.play }}
      onPress={pressHandler}
    />
  )
}

const styles = StyleSheet.create({
  play: {
    borderRadius: 50,
  },
});

export default PlayButton