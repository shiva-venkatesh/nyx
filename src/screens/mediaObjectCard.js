import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { Row, View, Image, Caption, Subtitle } from '@shoutem/ui';

const MediaObjectCard = ({cardImage, cardTitle, key, subtitle, type}) => {
  return(
    <Row>
      <Image
        styleName="medium rounded-corners"
        source={{ uri: cardImage }}
      />
      <View styleName="vertical stretch space-between">
        <Subtitle>{cardTitle}</Subtitle>
        <View styleName="horizontal space-between">
          <Caption>{subtitle}</Caption>
        </View>
      </View>
    </Row>
  )
}

export default MediaObjectCard