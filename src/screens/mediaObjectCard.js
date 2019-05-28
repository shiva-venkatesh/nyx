import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { Row, View, Image, Caption, Subtitle } from '@shoutem/ui';

const MediaObjectCard = ({cardImage, cardTitle, key}) => {
  return(
    <Row>
      <Image
        styleName="medium rounded-corners"
        source={{ uri: cardImage }}
      />
      <View styleName="vertical stretch space-between">
        <Subtitle>{cardTitle}</Subtitle>
        <View styleName="horizontal space-between">
          <Caption>3 days ago</Caption>
          <Caption>12:16</Caption>
        </View>
      </View>
    </Row>
  )
}

export default MediaObjectCard