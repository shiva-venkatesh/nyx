import React, { Component } from 'react'
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  ScrollView,
  Image,
  ActivityIndicator          // Container component
} from 'react-native'

import { Icon } from 'react-native-elements'


import { Input } from '../../helper/input'
import { Button } from '../../helper/button'
import Storage from '../../helper/storage'
const baseURL = 'https://nyx-in.herokuapp.com/api'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      phone:'',
      name:'',
      buttonText: 'Log In',
      loginForm:true
    }
    // this.onPressLogIn = this.onPressLogIn.bind(this)
  }

  componentDidMount() {
    
  }

  onPressLogIn=()=> {
    console.log(this.state.email)
    var url = `${baseURL}/v1/auth/login?email=${this.state.email}&password=${this.state.password}`;

    fetch(baseURL + `/v1/auth/login`, {
      method: 'post',
      body: JSON.stringify({email: this.state.email,password:this.state.password})
  })// fetch(url)
      .then(response => response.json())
      .then((response) => {
        // console.log(data[0].restaurant.name)
        if(response.auth==true)
        {
            Storage.setItem('user',response.token);
            
        }else
        {
          if(response.error=="No user found.")
          {
            setTimeout(()=>alert('Email or password is wrong'),1000)
          }
        }


      }).catch((error) => {
        // console.log("ERRR:"+ error);
    })
      
  }

  render() {
    return(
      <View style={styles.loginContainer}>
        <View style={styles.Image}>
          <Image source={require('./nyx-icon.png')} />
        </View>
        
          {
            this.state.loginForm==true?
            <View 
            // style={{backgroundColor:'red'}}
            >
            <Input
              label='Email'
              placeholder='Enter your email'
              onChangeText={email => this.setState({ email })}
            />
            <Input
              label='Password'
              placeholder='Enter your password'
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
            <Button
              // onPress={() => console.log('Pressed login') }
              children={this.state.buttonText}
              onPress={()=>this.onPressLogIn()}
            />
             <Text>Not signed up yet?</Text>
              <Button
              children={"Sign up"}
              onPress={()=>{this.setState({loginForm:false})}}
              />
          </View>:
          <ScrollView>
            <Input
              label='Name'
              placeholder='Enter your name'
              onChangeText={email => this.setState({ name:email })}
            />
            <Input
              label='Phone'
              placeholder='Enter your phone number'
              onChangeText={email => this.setState({ phone:email })}
            />
            <Input
              label='Email'
              placeholder='Enter your email'
              onChangeText={email => this.setState({ email })}
            />
            <Input
              label='Password'
              placeholder='Enter your password'
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
            <Button
              // onPress={() => console.log('Pressed login') }
              children={"Sign up"}
              onPress={()=>this.onPressLogIn()}
            />
             <Text>Login instead?</Text>
              <Button
              children={"Login"}
              onPress={()=>{this.setState({loginForm:true})}}
              />
          </ScrollView>
             
          }
         
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    width:'100%',
    height:'100%',
    paddingHorizontal:10,
    paddingVertical:15,

    // backgroundColor:'green'
  },
  Image:{
    alignContent:'center',
    alignSelf:'center',
    marginBottom:20
  }
})
