

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,PermissionsAndroid, ActivityIndicator} from 'react-native';
import Storage from './src/helper/storage'

import Login from './src/screens/auth/login'
import Home from './src/screens/home'
import splashScreen from 'react-native-splash-screen'
const baseURL = 'https://nyx-in.herokuapp.com/api'

import { createStackNavigator,createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  LoginS: {
    screen: Login, navigationOptions: { header: null }
  },
  HomeS: {
    screen: Home, navigationOptions: { header: null }
  },
  
  

});

const AppStack = createAppContainer(AppNavigator);



export default class App extends Component{
  
  constructor(props)
  {
    super(props)
   
  }
  state=
  {
    location:null,
    gotoHome:null
  }
  componentWillMount()
  {

    Storage.getItem('user').then((user) => {
      if (user != null) {
         this.setState({gotoHome:true})
      }else{
        this.setState({gotoHome:false})
      } 
    });


    const granted =  PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

    if (granted) {
      this.findCoordinates()
    } 
    else {}

  }
  

  componentDidMount()
  {
    splashScreen.hide()
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);
        // this.setState({location:location},()=>{()=>this._getLocationAsync()});
         
    var url = `${baseURL}/v1/places?lat=${position.coords.latitude}&long=${position.coords.longitude}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        // console.log(data[0].restaurant.name)
        this.setState({
          places: data,
          loaded: true,
          location:position
        });
        Storage.setItem('location',position);
        Storage.setItem('places',data);

      });
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  _getLocationAsync =  () => {
    
    var url = `${baseURL}/v1/places?lat=${this.state.location.coords.latitude}&long=${this.state.location.coords.longitude}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data[0].restaurant.name)
        this.setState({
          places: data,
          loaded: true
        });
      });
  };
  
  
  render() {
    if(this.state.gotoHome!=null)
    {
      if(this.state.gotoHome==false)
      { 
         return(
          // <View style={styles.container}>
            <AppStack/>
        //  </View>
        );
      }else{
        if(this.state.loaded) {
          return (
            <Home
              user={this.state.user}
              location={this.state.location}
              places={this.state.places}
            />
          );
        }
        else{
          return (
            <View style={styles.centeredSpinner}>
              <ActivityIndicator size="large" color="#413C3B" />
            </View>
          )
        }
      }
    }
    else
    {
      return (
        <View style={styles.centeredSpinner}>
          <ActivityIndicator size="large" color="#413C3B" />
        </View>
      )
    }
   
   
    // return (
      
    //   <View style={styles.container}>
    //      <Login/>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
