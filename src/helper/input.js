import React, { Component } from 'react'
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  TextInput          // Container component
} from 'react-native'

const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
        underlineColorAndroid={'transparent'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    paddingBottom: 5,
    color: '#333',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 2,
    color: '#333',
    fontSize: 18,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'rgba(0,0,0,0)'
  }
})

export { Input }
