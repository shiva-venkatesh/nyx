import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  Image          // Container component
} from 'react-native';

import { Card, ListItem, Button, Divider } from 'react-native-elements'

const FeedCard = ({cardTitle, cardPicture, cardText, cardType}) => {
  return(
      <Card title={cardTitle} containerStyle={styles.cardContainer} dividerStyle={styles.divider} wrapperStyle={styles.wrapper} titleStyle={styles.title}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}
            resizeMode="cover"
            source={{ uri: cardPicture }}
          />
        </View>
      </Card>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    width: 280,
  },
  divider: {
    backgroundColor: 'gray'
  },
  cardTitle: {
    fontFamily: 'proza-libre'
  },
  title: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '200',
    color: '#64818F'
  },
  imageContainer: {
    alignItems: 'center'
  },
  cardContainer: {
    marginBottom: 10,
  }
});

export default FeedCard
